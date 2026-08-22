import json, re, time
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen

INDEX = Path('index.html')
OUT = Path('data/price-check.json')
OUT.parent.mkdir(parents=True, exist_ok=True)

html = INDEX.read_text(encoding='utf-8')
# Read the first two fields of each app entry and its official URL from the catalog.
pattern = re.compile(r"\['([^']+?)','([^']+?)','[^']+?','[^']+?',\s*'([^']+?)'\]")
apps = pattern.findall(html)

money = re.compile(r'(?:US\$|\$|USD\s*)\s?\d+(?:[.,]\d+)?(?:\s*/\s*(?:month|year|mo|yr))?', re.I)
results = []

for name, catalog_price, url in apps:
    item = {
        'name': name,
        'catalog_price': catalog_price,
        'official_url': url,
        'checked_at': datetime.now(timezone.utc).isoformat(),
        'status': 'not_checked',
        'prices_found': []
    }
    try:
        req = Request(url, headers={'User-Agent': 'SchoolHub-PriceChecker/1.0'})
        with urlopen(req, timeout=15) as response:
            content_type = response.headers.get('content-type', '')
            if 'text/html' not in content_type:
                item['status'] = 'non_html'
            else:
                text = response.read(500_000).decode('utf-8', errors='ignore')
                found = sorted(set(money.findall(text)))
                item['prices_found'] = found[:25]
                item['status'] = 'review' if found else 'no_price_found'
    except Exception as exc:
        item['status'] = 'unreachable'
        item['error'] = str(exc)[:180]
    results.append(item)
    time.sleep(0.15)

summary = {
    'generated_at': datetime.now(timezone.utc).isoformat(),
    'resource_count': len(results),
    'note': 'This report does not automatically replace catalog prices. It flags official pages for review because pricing pages differ and some prices are rendered dynamically.',
    'results': results,
}
OUT.write_text(json.dumps(summary, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(f'Checked {len(results)} resources; report written to {OUT}.')
