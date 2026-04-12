(function () {
  const PROJECT_META = {
    shivneri: {
      title: 'Shivneri',
      location: 'Village Ottariya, Dholera SIR',
      desc: 'Located inside Dholera SIR (Survey No. 183, FP No. 145). Features 12m and 7.5m wide internal roads.',
      amenities: [
        'Gazebo & Senior Citizen Park',
        'Joggers Park & Children Park',
        'CCTV Camera & Security Cabin',
        'Underground Water & Electricity'
      ],
      hasMap: true
    },
    dreamcity: {
      title: 'Dream City',
      location: 'Village Kharad, Near TP-2',
      desc: 'Survey No. 1438. Safe & secured investment near Dholera SIR boundary.',
      amenities: ['Attractive Entrance Gate', 'Garden & Children Park', 'Senior Citizen Park', 'Plot Demarcation'],
      hasMap: false
    },
    ajinkyatara: {
      title: 'Ajinkya Tara',
      location: 'Village Ratanpur, Dholera',
      desc: 'New Survey No. 292. Next to GETCO 400kv Solar Park. 15 min from International Airport.',
      amenities: ['Statue of Chhatrapati Shivaji Maharaj', 'Grand Fountain', 'Joggers Park', 'Next to Solar Park'],
      hasMap: false
    }
  };

  const SHIVNERI_PLOTS = [
    { id: '1', size: 352, pos: 's-plot-1' },
    { id: '2', size: 352, pos: 's-plot-2' },
    { id: '3', size: 700, pos: 's-plot-3' },
    { id: '4', size: 404, pos: 's-plot-4' },
    { id: '5', size: 433, pos: 's-plot-5' },
    { id: '6', size: 350, pos: 's-plot-6' },
    { id: '7', size: 350, pos: 's-plot-7' },
    { id: '8', size: 350, pos: 's-plot-8' },
    { id: '9', size: 350, pos: 's-plot-9' },
    { id: '10', size: 433, pos: 's-plot-10' },
    { id: '11', size: 404, pos: 's-plot-11' },
    { id: '12', size: 700, pos: 's-plot-12' },
    { id: '13', size: 352, pos: 's-plot-13' },
    { id: '14', size: 352, pos: 's-plot-14' }
  ].map((p, i) => ({
    ...p,
    status: i % 3 === 0 ? 'sold' : 'available',
    price: `₹${Math.floor(p.size * 0.035)} Lakhs`
  }));

  function waDigits() {
    try {
      const raw = localStorage.getItem('aneweraSiteSettings');
      const s = raw ? JSON.parse(raw) : {};
      return String(s.whatsappNumber || s.phone || '917208324505').replace(/\D/g, '');
    } catch (e) {
      return '917208324505';
    }
  }

  function applySidebar(meta) {
    const title = document.getElementById('land-project-title');
    const loc = document.getElementById('land-project-location');
    const desc = document.getElementById('land-project-desc');
    const list = document.getElementById('land-amenities');
    if (title) title.textContent = meta.title;
    if (loc) loc.textContent = meta.location;
    if (desc) desc.textContent = meta.desc;
    if (list) {
      list.innerHTML = meta.amenities
        .map((a) => `<li class="flex gap-2"><span style="color:var(--royal-green)">✓</span> ${a}</li>`)
        .join('');
    }
  }

  function updateCounts(avail, sold) {
    const a = document.getElementById('count-available');
    const s = document.getElementById('count-sold');
    if (a) a.textContent = avail;
    if (s) s.textContent = sold;
  }

  function renderShivneri(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'shivneri-layout p-4';
    wrapper.innerHTML =
      '<div class="s-park"><span>🌳 GARDEN</span></div><div class="s-entry">18.00 MTR ENTRY ROAD</div>';
    SHIVNERI_PLOTS.forEach((plot) => {
      const el = document.createElement('div');
      el.className = `plot ${plot.status} ${plot.pos}`;
      el.innerHTML = `<span>${plot.id}</span><span style="font-size:9px;font-weight:400;margin-top:2px;">${plot.size} sq.yd</span>`;
      el.addEventListener('click', () => openPlotModal(plot));
      wrapper.appendChild(el);
    });
    container.innerHTML = '';
    container.appendChild(wrapper);
    const avail = SHIVNERI_PLOTS.filter((p) => p.status === 'available').length;
    const sold = SHIVNERI_PLOTS.filter((p) => p.status === 'sold').length;
    updateCounts(avail, sold);
  }

  function renderPlaceholder(container) {
    container.innerHTML =
      '<p class="text-center font-ui p-8 max-w-md mx-auto text-[var(--text-light)] leading-relaxed">Interactive plot layout for this project will be published here. For current inventory and holding options, please reach out to our concierge team.</p>';
    updateCounts('—', '—');
  }

  function openPlotModal(plot) {
    const modal = document.getElementById('plot-detail-modal');
    const body = document.getElementById('plot-detail-body');
    if (!modal || !body) return;
    const w = waDigits();
    body.innerHTML = `
      <p class="font-label text-xs text-[var(--text-light)] uppercase tracking-wider">Plot #${plot.id}</p>
      <p class="font-heading text-2xl mt-1 text-[var(--text-dark)]">${plot.size} sq.yds</p>
      <p class="mt-2 font-ui text-[var(--text-mid)]"><span class="font-semibold">Status:</span> ${plot.status}</p>
      <p class="mt-1 font-ui text-[var(--text-mid)]"><span class="font-semibold">Indicative:</span> ${plot.price}</p>
      <a class="btn-royal inline-flex mt-4" href="https://wa.me/${w}?text=${encodeURIComponent(`Enquiry for Shivneri Plot ${plot.id} (${plot.size} sq.yd)`)}">Enquire on WhatsApp</a>
    `;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function highlightTab(slug) {
    document.querySelectorAll('[data-project-tab]').forEach((el) => {
      el.classList.toggle('active', el.getAttribute('data-project-tab') === slug);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('map-container');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    let project = params.get('project') || 'shivneri';
    if (!PROJECT_META[project]) project = 'shivneri';

    const meta = PROJECT_META[project];
    applySidebar(meta);
    highlightTab(project);

    if (meta.hasMap) {
      renderShivneri(container);
    } else {
      renderPlaceholder(container);
    }

    document.querySelectorAll('[data-close-plot-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const modal = document.getElementById('plot-detail-modal');
        if (modal) {
          modal.classList.remove('open');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });
})();
