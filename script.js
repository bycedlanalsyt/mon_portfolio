const projects = [
  {
    id: 'p1',
    title: 'Analyse de données avec Python',
    description: 'Nettoyage et visualisation de données avec Pandas, NumPy et Matplotlib.',
    image: './images/projet-python.jpg',
    tags: ['Python', 'Data Analysis', 'Pandas'],
    demo: '#',
    code: 'https://github.com/votre-nom/projet-python'
  },
  {
    id: 'p2',
    title: 'Dashboard PowerBI',
    description: 'Visualisation des ventes.',
    image: './images/projet-powerbi.jpg',
    tags: ['PowerBI', 'Ventes', 'Dashboard'],
    demo: '#',
    code: '#'
  },
  {
    id: 'p3',
    title: 'Requêtes SQL',
    description: 'Analyse de base de données Chinook.',
    image: './images/projet-sql.jpg',
    tags: ['SQL', 'Database', 'Analytics'], 
    demo: '#',
    code: '#'
  },
  {
    id: 'p4',
    title: 'Générateur de portfolios',
    description: 'Génération statique et thèmes multiples.',
    image: 'https://images.unsplash.com/photo-1524646432680-5f84c4bfa1ff?q=80&w=1200&auto=format&fit=crop',
    tags: ['JavaScript', 'Tooling'],
    demo: 'https://example.com/demo3',
    code: 'https://github.com/yourname/demo3'
  }

];

const state = {
  activeTags: new Set(),
  search: '',
  theme: 'dark'
};

function init() {
  // Theme persistence
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    state.theme = saved;
  }
  applyTheme();

  // Navbar mobile toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Back to top
  const backToTop = document.querySelector('.back-to-top');
  backToTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Year
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', state.theme);
    applyTheme();
  });

  // Build filters and grid
  buildFilters();
  renderGrid();

  // Modal wiring
  wireModal();

  // Search
  const search = document.getElementById('searchInput');
  const update = debounce(() => {
    state.search = (search.value || '').trim().toLowerCase();
    renderGrid();
  }, 120);
  search?.addEventListener('input', update);

  // Track cursor glow
  window.addEventListener('pointermove', (e) => {
    document.documentElement.style.setProperty('--cursorX', e.clientX + 'px');
    document.documentElement.style.setProperty('--cursorY', e.clientY + 'px');
  });
}

function applyTheme() {
  if (state.theme === 'light') {
    document.documentElement.style.setProperty('--bg', '#ffffff');
    document.documentElement.style.setProperty('--bg-elev', '#f6f7f9');
    document.documentElement.style.setProperty('--text', '#0b0c10');
    document.documentElement.style.setProperty('--muted', '#4b5563');
    document.documentElement.style.setProperty('--border', '#e5e7eb');
  } else {
    document.documentElement.style.setProperty('--bg', '#0b0c10');
    document.documentElement.style.setProperty('--bg-elev', '#111318');
    document.documentElement.style.setProperty('--text', '#e5e7eb');
    document.documentElement.style.setProperty('--muted', '#a1a1aa');
    document.documentElement.style.setProperty('--border', '#23262d');
  }
}

function uniqueTags() {
  const tags = new Set();
  projects.forEach(p => p.tags.forEach(t => tags.add(t)));
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

function buildFilters() {
  const container = document.getElementById('filters');
  if (!container) return;
  container.innerHTML = '';
  const all = document.createElement('button');
  all.className = 'filter-chip';
  all.textContent = 'Tous';
  all.setAttribute('aria-pressed', 'true');
  all.addEventListener('click', () => {
    state.activeTags.clear();
    syncFilterPressed();
    renderGrid();
  });
  container.appendChild(all);

  uniqueTags().forEach(tag => {
    const chip = document.createElement('button');
    chip.className = 'filter-chip';
    chip.textContent = tag;
    chip.setAttribute('data-tag', tag);
    chip.setAttribute('aria-pressed', 'false');
    chip.addEventListener('click', () => {
      if (state.activeTags.has(tag)) {
        state.activeTags.delete(tag);
      } else {
        state.activeTags.add(tag);
      }
      syncFilterPressed();
      renderGrid();
    });
    container.appendChild(chip);
  });
}

function syncFilterPressed() {
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    const tag = chip.getAttribute('data-tag');
    if (!tag) {
      chip.setAttribute('aria-pressed', String(state.activeTags.size === 0));
      return;
    }
    chip.setAttribute('aria-pressed', String(state.activeTags.has(tag)));
  });
}

function renderGrid() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const list = projects.filter(p => {
    if (state.activeTags.size === 0) return true;
    return p.tags.some(t => state.activeTags.has(t));
  });

  const search = state.search;
  const searched = search
    ? list.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.tags.some(t => t.toLowerCase().includes(search))
      )
    : list;

  const resultsCount = document.getElementById('resultsCount');
  if (resultsCount) {
    resultsCount.textContent = `${searched.length} résultat${searched.length > 1 ? 's' : ''}`;
  }

  if (searched.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'Aucun projet ne correspond à ces filtres.';
    empty.style.color = 'var(--muted)';
    grid.appendChild(empty);
    return;
  }

  searched.forEach(p => grid.appendChild(projectCard(p)));

  // Reveal on scroll via IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function projectCard(project) {
  const card = document.createElement('article');
  card.className = 'card reveal';

  const img = document.createElement('img');
  img.loading = 'lazy';
  img.src = project.image;
  img.alt = `Aperçu du projet ${project.title}`;
  card.appendChild(img);

  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('h3');
  title.textContent = project.title;
  body.appendChild(title);

  const tagsWrap = document.createElement('div');
  tagsWrap.className = 'tags';
  project.tags.forEach(t => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = t;
    tagsWrap.appendChild(tag);
  });
  body.appendChild(tagsWrap);

  const actions = document.createElement('div');
  actions.className = 'actions';
  const more = document.createElement('button');
  more.className = 'btn';
  more.textContent = 'Détails';
  more.addEventListener('click', () => openModal(project));
  more.addEventListener('pointermove', (e) => {
    const rect = more.getBoundingClientRect();
    const x = e.clientX - rect.left;
    more.style.setProperty('--mx', Math.round((x / rect.width) * 100) + '%');
  });
  const demo = document.createElement('a');
  demo.className = 'btn primary';
  demo.textContent = 'Demo';
  demo.href = project.demo;
  demo.target = '_blank';
  demo.rel = 'noopener';
  demo.addEventListener('click', (e) => e.stopPropagation());
  demo.addEventListener('pointermove', (e) => {
    const rect = demo.getBoundingClientRect();
    const x = e.clientX - rect.left;
    demo.style.setProperty('--mx', Math.round((x / rect.width) * 100) + '%');
  });
  actions.appendChild(more);
  actions.appendChild(demo);

  body.appendChild(actions);
  card.appendChild(body);

  // Tilt 3D effect
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -6;
    const ry = ((x / rect.width) - 0.5) * 6;
    card.style.setProperty('--rx', rx + 'deg');
    card.style.setProperty('--ry', ry + 'deg');
    card.style.setProperty('--mx', Math.round((x / rect.width) * 100) + '%');
    card.style.setProperty('--my', Math.round((y / rect.height) * 100) + '%');
  });
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '0%');
  });
  return card;
}

function wireModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
  const closeBtn = modal.querySelector('[data-close]');
  closeBtn?.addEventListener('click', () => modal.close());
}

function openModal(project) {
  const modal = document.getElementById('projectModal');
  const img = document.getElementById('modalImage');
  const title = document.getElementById('modalTitle');
  const desc = document.getElementById('modalDescription');
  const demo = document.getElementById('modalDemo');
  const code = document.getElementById('modalCode');
  if (!modal || !img || !title || !desc || !demo || !code) return;
  img.src = project.image;
  img.alt = `Aperçu du projet ${project.title}`;
  title.textContent = project.title;
  desc.textContent = project.description;
  demo.href = project.demo;
  code.href = project.code;
  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    // Fallback browsers
    modal.setAttribute('open', 'true');
  }
}

function contactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) return false;
  const subject = encodeURIComponent('Contact Portfolio');
  const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
  return false;
}

window.addEventListener('DOMContentLoaded', init);

// Utils
function debounce(fn, wait) {
  let t;
  return function debounced(...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}



