/* SchoolHub - main homepage behavior */
(() => {
  const apps = [
    {name:'Khan Academy', emoji:'🎓', category:'Study Tools', price:'free', access:'by yourself', url:'https://www.khanacademy.org/'},
    {name:'IXL', emoji:'➗', category:'Math', price:'paid', access:'by yourself', url:'https://www.ixl.com/'},
    {name:'Google Classroom', emoji:'🏫', category:'Study Tools', price:'free', access:'teacher', url:'https://classroom.google.com/'},
    {name:'Canvas', emoji:'🎨', category:'Study Tools', price:'free/paid', access:'teacher', url:'https://www.instructure.com/canvas'},
    {name:'Quizizz', emoji:'🧠', category:'Educational Games', price:'free/paid', access:'by yourself', url:'https://quizizz.com/'},
    {name:'Kahoot!', emoji:'🎮', category:'Educational Games', price:'free/paid', access:'by yourself', url:'https://kahoot.com/'},
    {name:'Quizlet', emoji:'🗂️', category:'Study Tools', price:'free/paid', access:'by yourself', url:'https://quizlet.com/'},
    {name:'PBS LearningMedia', emoji:'📺', category:'General Learning', price:'free', access:'by yourself', url:'https://www.pbslearningmedia.org/'},
    {name:'Prodigy', emoji:'🧙', category:'Math', price:'free/paid', access:'by yourself', url:'https://www.prodigygame.com/'},
    {name:'Zearn', emoji:'➕', category:'Math', price:'free', access:'by yourself', url:'https://www.zearn.org/'},
    {name:'Math Playground', emoji:'🔢', category:'Math', price:'free/paid', access:'by yourself', url:'https://www.mathplayground.com/'},
    {name:'ReadTheory', emoji:'📖', category:'Reading', price:'free', access:'by yourself', url:'https://readtheory.org/'},
    {name:'CommonLit', emoji:'📚', category:'Reading', price:'free', access:'by yourself', url:'https://www.commonlit.org/'},
    {name:'ReadWorks', emoji:'📘', category:'Reading', price:'free', access:'by yourself', url:'https://www.readworks.org/'},
    {name:'CK-12', emoji:'🔬', category:'Science', price:'free', access:'by yourself', url:'https://www.ck12.org/'},
    {name:'PhET Interactive Simulations', emoji:'🧪', category:'Science', price:'free', access:'by yourself', url:'https://phet.colorado.edu/'},
    {name:'NASA STEM', emoji:'🚀', category:'Science', price:'free', access:'by yourself', url:'https://www.nasa.gov/stem/'},
    {name:'iCivics', emoji:'🌎', category:'Social Studies', price:'free', access:'by yourself', url:'https://ed.icivics.org/'},
    {name:'Scratch', emoji:'🐱', category:'Coding', price:'free', access:'by yourself', url:'https://scratch.mit.edu/'},
    {name:'Code.org', emoji:'💻', category:'Coding', price:'free', access:'by yourself', url:'https://code.org/'},
    {name:'freeCodeCamp', emoji:'🧑‍💻', category:'Coding', price:'free', access:'by yourself', url:'https://www.freecodecamp.org/'},
    {name:'Tinkercad', emoji:'🧩', category:'Coding', price:'free', access:'by yourself', url:'https://www.tinkercad.com/'},
    {name:'Duolingo', emoji:'🦉', category:'Languages', price:'free/paid', access:'by yourself', url:'https://www.duolingo.com/'},
    {name:'SpanishDict', emoji:'🇪🇸', category:'Languages', price:'free', access:'by yourself', url:'https://www.spanishdict.com/'},
    {name:'Art for Kids Hub', emoji:'🎨', category:'Arts', price:'free', access:'by yourself', url:'https://www.artforkidshub.com/'},
    {name:'Chrome Music Lab', emoji:'🎵', category:'Arts', price:'free', access:'by yourself', url:'https://musiclab.chromeexperiments.com/'},
    {name:'GeoGebra', emoji:'📐', category:'Math', price:'free', access:'by yourself', url:'https://www.geogebra.org/'},
    {name:'Desmos', emoji:'📊', category:'Math', price:'free', access:'by yourself', url:'https://www.desmos.com/'},
    {name:'Mathigon', emoji:'📐', category:'Math', price:'free', access:'by yourself', url:'https://mathigon.org/'},
    {name:'TED-Ed', emoji:'💡', category:'General Learning', price:'free', access:'by yourself', url:'https://ed.ted.com/'},
    {name:'Crash Course', emoji:'🎬', category:'General Learning', price:'free', access:'by yourself', url:'https://thecrashcourse.com/'},
    {name:'OpenStax', emoji:'📚', category:'General Learning', price:'free', access:'by yourself', url:'https://openstax.org/'},
    {name:'Internet Archive', emoji:'🗄️', category:'General Learning', price:'free', access:'by yourself', url:'https://archive.org/'},
    {name:'Project Gutenberg', emoji:'📕', category:'Reading', price:'free', access:'by yourself', url:'https://www.gutenberg.org/'},
    {name:'TypingClub', emoji:'⌨️', category:'Study Tools', price:'free/paid', access:'by yourself', url:'https://www.typingclub.com/'},
    {name:'Nitro Type', emoji:'🏎️', category:'Educational Games', price:'free', access:'by yourself', url:'https://www.nitrotype.com/'}
  ];

  const grid = document.getElementById('appGrid');
  const count = document.getElementById('resultCount');
  const search = document.getElementById('searchInput');
  const category = document.getElementById('categoryFilter');
  const price = document.getElementById('priceFilter');
  const access = document.getElementById('accessFilter');
  const sort = document.getElementById('sortFilter');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');
  const closeModal = document.getElementById('closeModal');
  const favorites = new Set(JSON.parse(localStorage.getItem('schoolhub-favorites') || '[]'));

  if (!grid) return;

  const categories = [...new Set(apps.map(a => a.category))].sort();
  categories.forEach(c => category?.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`));

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function logoMarkup(app) {
    // Emoji is intentionally used as the guaranteed fallback. A real logo URL can
    // be added later without breaking the card if the image fails to load.
    return `<div class="app-logo-fallback" aria-label="${escapeHtml(app.name)} icon">${app.emoji}</div>`;
  }

  function render(list) {
    grid.innerHTML = list.map(app => `
      <article class="app-card" data-name="${escapeHtml(app.name)}">
        <div class="app-card-top">
          ${logoMarkup(app)}
          <button class="favorite-button" data-favorite="${escapeHtml(app.name)}" aria-label="Favorite ${escapeHtml(app.name)}">${favorites.has(app.name) ? '❤️' : '🤍'}</button>
        </div>
        <h3>${escapeHtml(app.name)}</h3>
        <p class="app-description">${escapeHtml(app.category)} learning resource.</p>
        <div class="app-badges"><span>${escapeHtml(app.price)}</span><span>${escapeHtml(app.access)}</span></div>
        <div class="app-actions">
          <button class="secondary-button details-button" data-details="${escapeHtml(app.name)}">ℹ️ Details</button>
          <a class="primary-button" href="${app.url}" target="_blank" rel="noopener noreferrer">Open Website ↗</a>
        </div>
      </article>`).join('');

    count.textContent = `${list.length} website${list.length === 1 ? '' : 's'} shown`;

    grid.querySelectorAll('[data-favorite]').forEach(button => button.addEventListener('click', () => {
      const name = button.dataset.favorite;
      favorites.has(name) ? favorites.delete(name) : favorites.add(name);
      localStorage.setItem('schoolhub-favorites', JSON.stringify([...favorites]));
      applyFilters();
    }));

    grid.querySelectorAll('[data-details]').forEach(button => button.addEventListener('click', () => {
      const app = apps.find(a => a.name === button.dataset.details);
      if (!app) return;
      modalContent.innerHTML = `<h2>${escapeHtml(app.emoji)} ${escapeHtml(app.name)}</h2><p>${escapeHtml(app.category)} resource.</p><p><strong>Price:</strong> ${escapeHtml(app.price)}</p><p><strong>Access:</strong> ${escapeHtml(app.access)}</p><a class="primary-button" href="${app.url}" target="_blank" rel="noopener noreferrer">Open Website ↗</a>`;
      modal.classList.remove('hidden');
    }));
  }

  function applyFilters() {
    const q = (search?.value || '').trim().toLowerCase();
    const cat = category?.value || 'all';
    const p = price?.value || 'all';
    const a = access?.value || 'all';
    let list = apps.filter(app =>
      (!q || `${app.name} ${app.category} ${app.price} ${app.access}`.toLowerCase().includes(q)) &&
      (cat === 'all' || app.category === cat) &&
      (p === 'all' || app.price === p) &&
      (a === 'all' || app.access === a)
    );
    if (sort?.value === 'rating') list.sort((x, y) => x.name.localeCompare(y.name));
    else if (sort?.value === 'favorites') list.sort((x, y) => Number(favorites.has(y.name)) - Number(favorites.has(x.name)));
    else list.sort((x, y) => x.name.localeCompare(y.name));
    render(list);
  }

  [search, category, price, access, sort].forEach(el => el?.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', applyFilters));
  document.getElementById('favoritesButton')?.addEventListener('click', () => {
    const old = search.value;
    search.value = '';
    const list = apps.filter(a => favorites.has(a.name));
    render(list);
    search.value = old;
  });
  document.getElementById('randomButton')?.addEventListener('click', () => {
    const app = apps[Math.floor(Math.random() * apps.length)];
    window.open(app.url, '_blank', 'noopener,noreferrer');
  });
  document.getElementById('darkModeButton')?.addEventListener('click', () => document.body.classList.toggle('dark-mode'));
  closeModal?.addEventListener('click', () => modal.classList.add('hidden'));
  modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });

  render(apps);
})();

// Safe logo fallback available to future cards that use real image URLs.
window.SchoolHubLogoFallback = function (img, fallback) {
  if (img) img.style.display = 'none';
  if (fallback) fallback.style.display = 'grid';
};
