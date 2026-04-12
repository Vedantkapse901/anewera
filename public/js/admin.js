const ADMIN_DEFAULTS = {
  companyName: 'A New Era Developers',
  companyTagline: 'Crafting legacy through visionary land and construction.',
  phone: '+917208324505',
  email: 'aneweradevelopers@gmail.com',
  address: 'Shanti Enclave, B-603, near Mira Road, Shanti Vihar, Mira Road East, Thane, Mira Bhayandar, Maharashtra 401107',
  mapLink: 'https://maps.app.goo.gl/8gdfFF9iGdgBigTX6',
  reraNo: 'Applied',
  heroLabel: '--- DHOLERA SIR · MIRA ROAD ---',
  heroTitle: "Building Tomorrow's Legacy",
  heroSubtitle: 'Premium Land & Architectural Construction Across India',
  heroStat1: '12+ Years',
  heroStat2: '500+ Plots',
  heroStat3: '3 Landmark Projects',
  heroStat4: '₹500Cr+ Assets',
  heroImage1: 'public/images/s1.jpg',
  heroImage2: 'public/images/s2.jpg',
  heroImage3: 'public/images/s3.jpg',
  whatsappNumber: '917208324505'
};

const DEFAULT_PASSWORD = 'anewera@admin';
const SESSION_KEY = 'aneweraAdminSession';
const CUSTOM_PW_KEY = 'aneweraAdminPassword';
const PREFS_KEY = 'aneweraAdminPrefs';

const api = (path, opts = {}) =>
  fetch(path, {
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts
  }).then(async (r) => {
    const ct = r.headers.get('content-type') || '';
    let body;
    if (ct.includes('application/json')) {
      body = await r.json();
    } else {
      body = { error: await r.text() };
    }
    if (!r.ok) return Promise.reject(body);
    return body;
  });

let shellReady = false;
let charts = { monthly: null, donut: null, revenue: null };
let bookingsCache = [];
let modalResolve = null;
let modalMode = '';

document.addEventListener('DOMContentLoaded', () => {
  setupGate();
  const form = document.getElementById('site-settings-form');
  if (form) {
    hydrateForm(form, loadSettings());
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const next = collectForm(form);
      localStorage.setItem('aneweraSiteSettings', JSON.stringify(next));
      const st = document.getElementById('admin-save-status');
      if (st) {
        st.textContent = 'Content saved. Public pages use this data on next load.';
        st.style.color = 'var(--royal-green)';
      }
    });
  }
  document.getElementById('reset-site-settings')?.addEventListener('click', () => {
    localStorage.setItem('aneweraSiteSettings', JSON.stringify(ADMIN_DEFAULTS));
    if (form) hydrateForm(form, ADMIN_DEFAULTS);
    const st = document.getElementById('admin-save-status');
    if (st) {
      st.textContent = 'Reset to defaults.';
      st.style.color = 'var(--royal-blue)';
    }
  });

  setupPrefsForm();
  document.getElementById('admin-signout')?.addEventListener('click', signOut);

  if (localStorage.getItem(SESSION_KEY) === '1') {
    initShell();
  }
});

function effectivePassword() {
  return localStorage.getItem(CUSTOM_PW_KEY) || DEFAULT_PASSWORD;
}

function setupGate() {
  const gate = document.getElementById('admin-gate');
  const shell = document.getElementById('admin-shell');
  const passwordInput = document.getElementById('admin-password');
  const loginButton = document.getElementById('admin-login-btn');
  const error = document.getElementById('admin-login-error');
  if (!gate || !shell || !passwordInput || !loginButton || !error) return;

  const unlock = () => {
    gate.classList.add('hidden');
    shell.classList.remove('hidden');
    document.body.classList.remove('admin-locked');
    localStorage.setItem(SESSION_KEY, '1');
    initShell();
  };

  if (localStorage.getItem(SESSION_KEY) === '1') {
    gate.classList.add('hidden');
    shell.classList.remove('hidden');
    document.body.classList.remove('admin-locked');
    return;
  }

  document.body.classList.add('admin-locked');
  loginButton.addEventListener('click', () => {
    if (passwordInput.value.trim() === effectivePassword()) {
      error.classList.add('hidden');
      unlock();
      return;
    }
    error.classList.remove('hidden');
  });
  passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      loginButton.click();
    }
  });
}

function signOut() {
  localStorage.removeItem(SESSION_KEY);
  location.reload();
}

function initShell() {
  if (shellReady) return;
  shellReady = true;
  setupNav();
  setupModal();
  loadPrefsUi();
  refreshBadges();
  showPanel('dashboard');
  loadDashboard();
  loadBookings();
  loadReviews();
  loadProjects();
  loadLeads();
  loadAnalytics();

  document.getElementById('bookings-search')?.addEventListener('input', () => renderBookingsTable());
  document.getElementById('bookings-filter-status')?.addEventListener('change', () => renderBookingsTable());
  document.getElementById('bookings-export-csv')?.addEventListener('click', exportBookingsCsv);
  document.getElementById('leads-filter-stage')?.addEventListener('change', loadLeads);
}

const PANEL_META = {
  dashboard: {
    title: 'Dashboard',
    desc: 'Live snapshot of bookings, reviews, and pipeline health.'
  },
  bookings: {
    title: 'Bookings',
    desc: 'Search, update status, and export site visit requests.'
  },
  reviews: {
    title: 'Reviews',
    desc: 'Moderate testimonials before they appear on the public site.'
  },
  projects: {
    title: 'Projects',
    desc: 'Track delivery progress across land and construction verticals.'
  },
  leads: {
    title: 'Leads',
    desc: 'Pipeline overview with direct contact actions.'
  },
  analytics: {
    title: 'Analytics',
    desc: 'Revenue trend, conversion, and inventory indicators.'
  },
  settings: {
    title: 'Settings',
    desc: 'Company profile, credentials, and assistant preferences.'
  }
};

function setupNav() {
  document.querySelectorAll('[data-panel]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.getAttribute('data-panel');
      if (panel) showPanel(panel);
    });
  });
}

function showPanel(id) {
  document.querySelectorAll('.admin-nav-btn').forEach((b) => {
    b.classList.toggle('is-active', b.getAttribute('data-panel') === id);
  });
  document.querySelectorAll('.admin-panel').forEach((p) => {
    const match = p.getAttribute('data-admin-panel') === id;
    p.classList.toggle('is-visible', match);
  });
  const meta = PANEL_META[id];
  if (meta) {
    const t = document.getElementById('admin-page-title');
    const d = document.getElementById('admin-page-desc');
    if (t) t.textContent = meta.title;
    if (d) d.textContent = meta.desc;
  }
  if (id === 'dashboard') loadDashboard();
  if (id === 'bookings') loadBookings();
  if (id === 'reviews') loadReviews();
  if (id === 'projects') loadProjects();
  if (id === 'leads') loadLeads();
  if (id === 'analytics') loadAnalytics();
}

async function refreshBadges() {
  try {
    const data = await api('/api/dashboard/stats');
    const pb = document.getElementById('badge-bookings');
    const pr = document.getElementById('badge-reviews');
    const nB = data.badges?.pendingBookings ?? 0;
    const nR = data.badges?.pendingReviews ?? 0;
    if (pb) {
      pb.textContent = String(nB);
      pb.classList.toggle('is-muted', nB === 0);
    }
    if (pr) {
      pr.textContent = String(nR);
      pr.classList.toggle('is-muted', nR === 0);
    }
  } catch {
    /* offline */
  }
}

async function loadDashboard() {
  try {
    const data = await api('/api/dashboard/stats');
    const kpis = data.kpis || {};
    document.querySelector('[data-kpi="bookings"]').textContent = kpis.bookings ?? '—';
    document.querySelector('[data-kpi="pendingVisits"]').textContent = kpis.pendingVisits ?? '—';
    document.querySelector('[data-kpi="reviews"]').textContent = kpis.reviews ?? '—';
    document.querySelector('[data-kpi="activeProjects"]').textContent = kpis.activeProjects ?? '—';

    document.querySelectorAll('.admin-kpi-card').forEach((el, i) => {
      el.classList.remove('admin-kpi-pop');
      void el.offsetWidth;
      el.style.animationDelay = `${i * 0.08}s`;
      el.classList.add('admin-kpi-pop');
    });

    const feed = document.getElementById('admin-activity-feed');
    if (feed) {
      feed.innerHTML = (data.activity || [])
        .map(
          (a) =>
            `<div class="admin-feed-item"><time>${formatIso(a.at)}</time>${escapeHtml(a.message || '')}</div>`
        )
        .join('');
    }

    const tbody = document.querySelector('#table-upcoming tbody');
    if (tbody) {
      tbody.innerHTML = (data.upcoming || [])
        .map(
          (u) =>
            `<tr><td>${escapeHtml(u.name)}</td><td>${escapeHtml(u.date)}</td><td>${escapeHtml(u.coach)}</td><td><span class="admin-pill ${escapeHtml(u.status)}">${escapeHtml(u.status)}</span></td></tr>`
        )
        .join('');
    }

    renderMonthlyChart(data.monthlyBars || []);
    renderDonutChart(data.leadDistribution || []);
  } catch (e) {
    console.error(e);
  }
}

function renderMonthlyChart(rows) {
  const canvas = document.getElementById('chart-monthly');
  if (!canvas || typeof Chart === 'undefined') return;
  if (charts.monthly) charts.monthly.destroy();
  charts.monthly = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: rows.map((r) => r.month),
      datasets: [
        {
          label: 'Enquiries',
          data: rows.map((r) => r.value),
          backgroundColor: 'rgba(26, 35, 126, 0.75)',
          borderColor: 'rgba(212, 160, 23, 0.9)',
          borderWidth: 1,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' } },
        x: { grid: { display: false } }
      }
    }
  });
}

function renderDonutChart(dist) {
  const canvas = document.getElementById('chart-donut');
  if (!canvas || typeof Chart === 'undefined') return;
  if (charts.donut) charts.donut.destroy();
  const labels = dist.map((d) => d.label);
  const values = dist.map((d) => d.value);
  const colors = ['#1A237E', '#2E7D32', '#B8860B', '#3949AB', '#B71C1C', '#78909C'];
  charts.donut = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: labels.map((_, i) => colors[i % colors.length]),
          borderWidth: 2,
          borderColor: '#fff'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }
      }
    }
  });
}

async function loadBookings() {
  try {
    const { items } = await api('/api/bookings');
    bookingsCache = items || [];
    renderBookingsTable();
  } catch (e) {
    console.error(e);
  }
}

function bookingMatchesFilters(b) {
  const q = document.getElementById('bookings-search')?.value?.trim().toLowerCase() || '';
  const st = document.getElementById('bookings-filter-status')?.value || 'all';
  if (st !== 'all' && b.status !== st) return false;
  if (!q) return true;
  const blob = `${b.name} ${b.phone} ${b.email} ${b.preferredDate}`.toLowerCase();
  return blob.includes(q);
}

function renderBookingsTable() {
  const tbody = document.querySelector('#table-bookings tbody');
  if (!tbody) return;
  const rows = bookingsCache.filter(bookingMatchesFilters);
  tbody.innerHTML = rows
    .map(
      (b) => `
    <tr data-id="${escapeHtml(b.id)}">
      <td>${escapeHtml(b.name)}</td>
      <td>${escapeHtml(b.phone)}</td>
      <td>${escapeHtml(b.email || '')}</td>
      <td>${escapeHtml(b.preferredDate || '')}</td>
      <td>${escapeHtml(b.coachType || '')}</td>
      <td>${escapeHtml(String(b.persons ?? ''))}</td>
      <td><span class="admin-pill ${escapeHtml(b.status)}">${escapeHtml(b.status)}</span></td>
      <td>
        <button type="button" class="admin-btn-sm" data-action="status" data-id="${escapeHtml(b.id)}">Status</button>
        <button type="button" class="admin-btn-sm danger" data-action="delete" data-id="${escapeHtml(b.id)}">Delete</button>
      </td>
    </tr>`
    )
    .join('');

  tbody.querySelectorAll('[data-action="status"]').forEach((btn) => {
    btn.addEventListener('click', () => openBookingStatusModal(btn.getAttribute('data-id')));
  });
  tbody.querySelectorAll('[data-action="delete"]').forEach((btn) => {
    btn.addEventListener('click', () => openDeleteBookingModal(btn.getAttribute('data-id')));
  });
}

function exportBookingsCsv() {
  const rows = bookingsCache.filter(bookingMatchesFilters);
  const header = ['name', 'phone', 'email', 'preferredDate', 'coachType', 'persons', 'status', 'createdAt'];
  const lines = [header.join(',')].concat(
    rows.map((b) =>
      header
        .map((k) => {
          const v = b[k] ?? '';
          const s = String(v).replace(/"/g, '""');
          return `"${s}"`;
        })
        .join(',')
    )
  );
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function openBookingStatusModal(id) {
  const booking = bookingsCache.find((x) => x.id === id);
  if (!booking) return;
  const modal = document.getElementById('admin-modal');
  const title = document.getElementById('admin-modal-title');
  const body = document.getElementById('admin-modal-body');
  const extra = document.getElementById('admin-modal-extra');
  modalMode = 'booking-status';
  if (title) title.textContent = 'Update booking status';
  if (body) body.textContent = `${booking.name} · ${booking.preferredDate || 'No date'}`;
  if (extra) {
    extra.innerHTML = `<label class="block font-ui text-sm mb-1">Status</label><select id="booking-status-select" class="w-full border border-[var(--silver)] rounded p-2">
      <option value="pending" ${booking.status === 'pending' ? 'selected' : ''}>Pending</option>
      <option value="confirmed" ${booking.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
      <option value="paid" ${booking.status === 'paid' ? 'selected' : ''}>Paid</option>
    </select>`;
  }
  modal.classList.add('is-open');
  modalResolve = async () => {
    const sel = document.getElementById('booking-status-select');
    const status = sel?.value;
    await api(`/api/bookings/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    await loadBookings();
    await refreshBadges();
    await loadDashboard();
  };
}

function openDeleteBookingModal(id) {
  const booking = bookingsCache.find((x) => x.id === id);
  if (!booking) return;
  modalMode = 'booking-delete';
  const modal = document.getElementById('admin-modal');
  const title = document.getElementById('admin-modal-title');
  const body = document.getElementById('admin-modal-body');
  const extra = document.getElementById('admin-modal-extra');
  if (title) title.textContent = 'Delete booking';
  if (body) body.textContent = `Remove the booking for ${booking.name}? This cannot be undone.`;
  if (extra) extra.innerHTML = '';
  modal.classList.add('is-open');
  modalResolve = async () => {
    await api(`/api/bookings/${id}`, { method: 'DELETE' });
    await loadBookings();
    await refreshBadges();
    await loadDashboard();
  };
}

function setupModal() {
  const modal = document.getElementById('admin-modal');
  const cancel = document.getElementById('admin-modal-cancel');
  const confirm = document.getElementById('admin-modal-confirm');
  const close = () => {
    modal.classList.remove('is-open');
    modalResolve = null;
  };
  cancel?.addEventListener('click', close);
  confirm?.addEventListener('click', async () => {
    if (modalResolve) await modalResolve();
    close();
  });
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}

async function loadReviews() {
  try {
    const { items } = await api('/api/reviews');
    const approved = items.filter((r) => r.status === 'approved');
    const pending = items.filter((r) => r.status === 'pending');
    const avg =
      approved.length > 0
        ? approved.reduce((s, r) => s + Number(r.rating), 0) / approved.length
        : items.length
          ? items.reduce((s, r) => s + Number(r.rating), 0) / items.length
          : 0;

    document.getElementById('review-avg-score').textContent = avg ? avg.toFixed(1) : '—';
    const stars = Math.round(avg) || 0;
    document.getElementById('review-avg-stars').textContent = '★'.repeat(stars) + '☆'.repeat(5 - stars);
    document.getElementById('review-pending-line').textContent = `Pending moderation: ${pending.length}`;

    const grid = document.getElementById('review-grid');
    grid.innerHTML = items
      .map(
        (r) => `
      <article class="admin-review-card">
        <header>
          <h4>${escapeHtml(r.name)}</h4>
          <span class="text-[var(--gold)]">${'★'.repeat(Number(r.rating))}</span>
        </header>
        <p>${escapeHtml(r.text)}</p>
        <p class="text-xs text-[var(--text-light)] mb-2">Status: <strong>${escapeHtml(r.status || 'pending')}</strong></p>
        <div>
          ${
            r.status === 'pending'
              ? `<button type="button" class="admin-btn-sm" data-review-approve="${escapeHtml(r.id)}">Approve</button>`
              : ''
          }
          <button type="button" class="admin-btn-sm danger" data-review-delete="${escapeHtml(r.id)}">Delete</button>
        </div>
      </article>`
      )
      .join('');

    grid.querySelectorAll('[data-review-approve]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        await api(`/api/reviews/${btn.getAttribute('data-review-approve')}`, {
          method: 'PATCH',
          body: JSON.stringify({ status: 'approved' })
        });
        await loadReviews();
        await refreshBadges();
      });
    });
    grid.querySelectorAll('[data-review-delete]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (!confirm('Delete this review permanently?')) return;
        await api(`/api/reviews/${btn.getAttribute('data-review-delete')}`, { method: 'DELETE' });
        await loadReviews();
        await refreshBadges();
      });
    });
  } catch (e) {
    console.error(e);
  }
}

async function loadProjects() {
  try {
    const { items } = await api('/api/projects');
    const container = document.getElementById('admin-projects-container');
    container.innerHTML = items
      .map((p) => {
        const sectorClass =
          p.sector === 'Land'
            ? 'sector-land'
            : p.sector === 'Commercial'
              ? 'sector-commercial'
              : 'sector-residential';
        return `
      <article class="admin-project-card ${sectorClass}" data-project-id="${escapeHtml(p.id)}">
        <h4 class="font-heading text-lg mb-1">${escapeHtml(p.name)}</h4>
        <p class="text-xs uppercase tracking-wider text-[var(--text-light)]">${escapeHtml(p.sector)} · ${escapeHtml(p.status)}</p>
        <div class="admin-progress"><div class="admin-progress-bar" style="width:${Number(p.progress)}%"></div></div>
        <label class="font-ui text-xs">Progress %</label>
        <input type="number" min="0" max="100" class="w-full border border-[var(--silver)] rounded p-1 mt-1 text-sm" data-field="progress" value="${Number(p.progress)}">
        <label class="font-ui text-xs mt-2 block">Status</label>
        <input type="text" class="w-full border border-[var(--silver)] rounded p-1 mt-1 text-sm" data-field="status" value="${escapeHtml(p.status)}">
        <button type="button" class="admin-btn-sm mt-3" data-save-project="${escapeHtml(p.id)}">Save</button>
      </article>`;
      })
      .join('');

    container.querySelectorAll('[data-save-project]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-save-project');
        const card = container.querySelector(`[data-project-id="${id}"]`);
        const progress = card.querySelector('[data-field="progress"]').value;
        const status = card.querySelector('[data-field="status"]').value;
        await api(`/api/projects/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ progress, status })
        });
        await loadProjects();
        await refreshBadges();
      });
    });
  } catch (e) {
    console.error(e);
  }
}

async function loadLeads() {
  try {
    const stage = document.getElementById('leads-filter-stage')?.value || 'all';
    const q = stage === 'all' ? '' : `?stage=${encodeURIComponent(stage)}`;
    const { items } = await api(`/api/leads${q}`);
    const tbody = document.querySelector('#table-leads tbody');
    tbody.innerHTML = items
      .map(
        (l) => `
      <tr>
        <td>${escapeHtml(l.name)}</td>
        <td>
          <a href="tel:${escapeHtml(String(l.phone).replace(/\s/g, ''))}" class="text-[var(--royal-blue)]">${escapeHtml(l.phone)}</a><br>
          <a href="mailto:${escapeHtml(l.email)}" class="text-[var(--royal-blue)] text-sm">${escapeHtml(l.email)}</a>
        </td>
        <td>
          <select class="border border-[var(--silver)] rounded p-1 text-sm" data-lead-stage="${escapeHtml(l.id)}">
            ${['inquiry', 'qualified', 'visit', 'negotiation', 'won', 'lost']
              .map((s) => `<option value="${s}" ${l.stage === s ? 'selected' : ''}>${s}</option>`)
              .join('')}
          </select>
        </td>
        <td>${escapeHtml(l.source)}</td>
        <td>${l.value ? `₹${(l.value / 10000000).toFixed(2)} Cr` : '—'}</td>
        <td></td>
      </tr>`
      )
      .join('');

    tbody.querySelectorAll('[data-lead-stage]').forEach((sel) => {
      sel.addEventListener('change', async () => {
        const id = sel.getAttribute('data-lead-stage');
        await api(`/api/leads/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ stage: sel.value })
        });
        await loadDashboard();
        await refreshBadges();
      });
    });
  } catch (e) {
    console.error(e);
  }
}

async function loadAnalytics() {
  try {
    const data = await api('/api/dashboard/stats');
    const rev = data.revenueTrend || [];
    const canvas = document.getElementById('chart-revenue');
    if (canvas && typeof Chart !== 'undefined') {
      if (charts.revenue) charts.revenue.destroy();
      charts.revenue = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: rev.map((r) => r.label),
          datasets: [
            {
              label: 'Revenue (₹)',
              data: rev.map((r) => r.revenue),
              backgroundColor: 'rgba(46, 125, 50, 0.65)'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { ticks: { callback: (v) => `₹${(v / 1000000).toFixed(1)}M` } } }
        }
      });
    }

    const c = data.conversion || {};
    document.getElementById('analytics-conversion').innerHTML = `
      <li>Inquiry → visit: <strong>${c.inquiryToVisit}%</strong></li>
      <li>Visit → booking: <strong>${c.visitToBooking}%</strong></li>
      <li>Lead → close: <strong>${c.leadToClose}%</strong></li>
    `;
    const inv = data.inventory || {};
    document.getElementById('analytics-inventory').innerHTML = `
      <div class="royal-card p-4"><p class="text-xs text-[var(--text-light)]">Plots available</p><p class="font-display text-2xl text-[var(--royal-green)]">${inv.plotsAvailable}</p></div>
      <div class="royal-card p-4"><p class="text-xs text-[var(--text-light)]">Plots sold</p><p class="font-display text-2xl text-[var(--royal-red)]">${inv.plotsSold}</p></div>
      <div class="royal-card p-4"><p class="text-xs text-[var(--text-light)]">Units under construction</p><p class="font-display text-2xl text-[var(--royal-blue)]">${inv.unitsUnderConstruction}</p></div>
    `;
  } catch (e) {
    console.error(e);
  }
}

function loadSettings() {
  const raw = localStorage.getItem('aneweraSiteSettings');
  if (!raw) return { ...ADMIN_DEFAULTS };
  try {
    return { ...ADMIN_DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...ADMIN_DEFAULTS };
  }
}

function hydrateForm(form, data) {
  Object.keys(ADMIN_DEFAULTS).forEach((key) => {
    const field = form.querySelector(`[name="${key}"]`);
    if (field) field.value = data[key] ?? '';
  });
}

function collectForm(form) {
  const out = {};
  Object.keys(ADMIN_DEFAULTS).forEach((key) => {
    const field = form.querySelector(`[name="${key}"]`);
    out[key] = field ? field.value.trim() : ADMIN_DEFAULTS[key];
  });
  return out;
}

function setupPrefsForm() {
  const form = document.getElementById('admin-prefs-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const p1 = document.getElementById('admin-new-password')?.value || '';
    const p2 = document.getElementById('admin-new-password-2')?.value || '';
    const st = document.getElementById('admin-prefs-status');
    if (p1 && p1 !== p2) {
      if (st) {
        st.textContent = 'Passwords do not match.';
        st.style.color = 'var(--royal-red)';
      }
      return;
    }
    if (p1) localStorage.setItem(CUSTOM_PW_KEY, p1);
    const prefs = {};
    form.querySelectorAll('.admin-switch[data-pref]').forEach((sw) => {
      prefs[sw.getAttribute('data-pref')] = sw.getAttribute('aria-checked') === 'true';
    });
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    if (st) {
      st.textContent = 'Preferences saved.';
      st.style.color = 'var(--royal-green)';
    }
    document.getElementById('admin-new-password').value = '';
    document.getElementById('admin-new-password-2').value = '';
  });
  form.querySelectorAll('.admin-switch').forEach((sw) => {
    sw.addEventListener('click', () => {
      const on = sw.getAttribute('aria-checked') !== 'true';
      sw.setAttribute('aria-checked', on ? 'true' : 'false');
    });
  });
}

function loadPrefsUi() {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return;
    const prefs = JSON.parse(raw);
    document.querySelectorAll('.admin-switch[data-pref]').forEach((sw) => {
      const k = sw.getAttribute('data-pref');
      if (prefs[k] !== undefined) sw.setAttribute('aria-checked', prefs[k] ? 'true' : 'false');
    });
  } catch {
    /* ignore */
  }
}

function formatIso(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return iso;
  }
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}
