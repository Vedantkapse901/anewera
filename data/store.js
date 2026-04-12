const bookings = [
  {
    id: 'bk_seed_1',
    name: 'A. Shah',
    phone: '+919876543210',
    email: 'a.shah@example.com',
    preferredDate: '2026-04-04',
    coachType: 'AC Coach',
    persons: 2,
    status: 'confirmed',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'bk_seed_2',
    name: 'N. Mehta',
    phone: '+919811223344',
    email: 'n.mehta@example.com',
    preferredDate: '2026-04-05',
    coachType: 'Sleeper',
    persons: 4,
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'bk_seed_3',
    name: 'R. Vora',
    phone: '+919955667788',
    email: 'r.vora@example.com',
    preferredDate: '2026-04-12',
    coachType: 'AC Coach',
    persons: 3,
    status: 'paid',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const reviews = [
  {
    id: 'rv_seed_1',
    name: 'Arvind Shah',
    rating: 5,
    text: 'A distinguished and transparent experience from consultation to closure.',
    status: 'approved',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
  },
  {
    id: 'rv_seed_2',
    name: 'Priya Desai',
    rating: 4,
    text: 'Clear documentation and timely responses on the Shivneri layout.',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 'rv_seed_3',
    name: 'Kiran Patel',
    rating: 5,
    text: 'Professional team; the site visit coach was comfortable.',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
  }
];

const leads = [
  {
    id: 'ld_1',
    name: 'Meera Joshi',
    phone: '+919812001122',
    email: 'meera.j@example.com',
    stage: 'qualified',
    source: 'Website',
    value: 18500000,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ld_2',
    name: 'Vikram Singh',
    phone: '+919833004455',
    email: 'vikram.s@example.com',
    stage: 'visit',
    source: 'Referral',
    value: 42000000,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ld_3',
    name: 'Sneha Rao',
    phone: '+919876500011',
    email: 'sneha.r@example.com',
    stage: 'inquiry',
    source: 'WhatsApp',
    value: 0,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ld_4',
    name: 'Harsh Trivedi',
    phone: '+919898776655',
    email: 'harsh.t@example.com',
    stage: 'negotiation',
    source: 'Walk-in',
    value: 28000000,
    updatedAt: new Date().toISOString()
  }
];

const projects = [
  {
    id: 'pr_1',
    name: 'Shivneri',
    sector: 'Land',
    status: 'Active sales',
    progress: 72,
    slug: 'shivneri'
  },
  {
    id: 'pr_2',
    name: 'Dream City',
    sector: 'Land',
    status: 'Pre-launch',
    progress: 38,
    slug: 'dreamcity'
  },
  {
    id: 'pr_3',
    name: 'Mira Residence One',
    sector: 'Residential',
    status: 'Construction',
    progress: 55,
    slug: 'mira-one'
  },
  {
    id: 'pr_4',
    name: 'Commerce Square',
    sector: 'Commercial',
    status: 'Planning',
    progress: 22,
    slug: 'commerce'
  }
];

const activities = [];

function logActivity(entry) {
  activities.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
    ...entry
  });
  if (activities.length > 50) activities.pop();
}

['Booking pipeline synced', 'New review awaiting moderation', 'Lead stage updated — Dream City'].forEach((msg, i) => {
  logActivity({ type: 'system', message: msg });
});

module.exports = {
  bookings,
  reviews,
  leads,
  projects,
  activities,
  logActivity
};
