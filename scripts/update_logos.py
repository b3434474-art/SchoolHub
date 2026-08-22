#!/usr/bin/env python3
"""Safely refresh SchoolHub's cached website logos.

Rules:
- A logo is replaced only after a new response is downloaded and verified as an image.
- Network errors, HTTP errors, redirects to non-images, empty responses, and invalid
  image data never delete or overwrite the existing cached logo.
- The domain list is read from scripts/logos.js so it stays in sync with the site.
"""

from __future__ import annotations

import hashlib
import re
import sys
import tempfile
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
LOGOS_JS = ROOT / "scripts" / "logos.js"
LOGO_DIR = ROOT / "assets" / "logos"

MAX_BYTES = 2 * 1024 * 1024
TIMEOUT = 20

IMAGE_SIGNATURES = (
    b"\x89PNG\r\n\x1a\n",
    b"\xff\xd8\xff",  # JPEG
    b"GIF87a",
    b"GIF89a",
    b"RIFF",  # WebP; checked more fully below
    b"\x00\x00\x01\x00",  # ICO
)


def safe_name(title: str) -> str:
    value = re.sub(r"[^A-Za-z0-9._-]+", "-", title.strip()).strip("-.")
    return value or "logo"


def is_image(data: bytes, content_type: str = "") -> bool:
    if not data or len(data) > MAX_BYTES:
        return False
    ctype = content_type.lower().split(";", 1)[0].strip()
    if ctype.startswith("image/") and ctype != "image/svg+xml":
        return True
    if data.startswith(IMAGE_SIGNATURES[:4]):
        return True
    if data.startswith(b"RIFF") and data[8:12] == b"WEBP":
        return True
    if data.startswith(b"\x00\x00\x01\x00"):
        return True
    return False


def parse_domains() -> dict[str, str]:
    text = LOGOS_JS.read_text(encoding="utf-8")
    match = re.search(r"const\s+domains\s*=\s*\{(.*?)\n\s*\};", text, re.S)
    if not match:
        raise RuntimeError("Could not find the domains object in scripts/logos.js")
    pairs = re.findall(r"'([^']+)'\s*:\s*'([^']+)'", match.group(1))
    if not pairs:
        raise RuntimeError("No logo domains were found in scripts/logos.js")
    return dict(pairs)


def fetch_logo(domain: str) -> bytes:
    # This is the same favicon source currently used by the live SchoolHub page.
    url = f"https://www.google.com/s2/favicons?domain={domain}&sz=128"
    request = Request(
        url,
        headers={
            "User-Agent": "SchoolHub-Logo-Updater/1.0 (+https://github.com/b3434474-art/SchoolHub)",
            "Accept": "image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8",
        },
    )
    with urlopen(request, timeout=TIMEOUT) as response:
        content_type = response.headers.get("Content-Type", "")
        data = response.read(MAX_BYTES + 1)
    if not is_image(data, content_type):
        raise ValueError(f"response was not a supported image ({content_type or 'unknown type'})")
    return data


def write_if_changed(path: Path, data: bytes) -> bool:
    if path.exists() and path.read_bytes() == data:
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(dir=path.parent, prefix=".logo-", suffix=".tmp", delete=False) as tmp:
        tmp.write(data)
        tmp_path = Path(tmp.name)
    tmp_path.replace(path)
    return True


def main() -> int:
    domains = parse_domains()
    LOGO_DIR.mkdir(parents=True, exist_ok=True)

    updated: list[str] = []
    unchanged: list[str] = []
    failed: list[str] = []

    for title, domain in domains.items():
        target = LOGO_DIR / f"{safe_name(title)}.png"
        try:
            data = fetch_logo(domain)
            digest = hashlib.sha256(data).hexdigest()[:12]
            if write_if_changed(target, data):
                updated.append(f"{title} (`{digest}`)")
            else:
                unchanged.append(title)
        except (HTTPError, URLError, TimeoutError, ValueError, OSError) as exc:
            # IMPORTANT: do not touch the old file on failure.
            failed.append(f"{title}: {exc}")

    summary = Path("$GITHUB_STEP_SUMMARY")
    if "GITHUB_STEP_SUMMARY" in __import__("os").environ:
        summary = Path(__import__("os").environ["GITHUB_STEP_SUMMARY"])
        with summary.open("a", encoding="utf-8") as out:
            out.write("## SchoolHub logo check\n\n")
            out.write(f"- **Updated:** {len(updated)}\n")
            out.write(f"- **Unchanged:** {len(unchanged)}\n")
            out.write(f"- **Failed safely:** {len(failed)}\n\n")
            if updated:
                out.write("### Updated\n" + "\n".join(f"- {x}" for x in updated) + "\n\n")
            if failed:
                out.write("### Failed safely (existing logos were kept)\n" + "\n".join(f"- {x}" for x in failed) + "\n")

    print(f"Updated: {len(updated)}")
    print(f"Unchanged: {len(unchanged)}")
    print(f"Failed safely: {len(failed)}")
    if failed:
        print("No existing logo was deleted or overwritten for failed checks.")

    # Network failures are expected occasionally, so they do not fail the workflow.
    return 0


if __name__ == "__main__":
    sys.exit(main())
