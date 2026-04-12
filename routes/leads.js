const express = require('express');
const { leads, logActivity } = require('../data/store');

const router = express.Router();

router.get('/', (req, res) => {
  const { stage } = req.query;
  let items = leads;
  if (stage && stage !== 'all') {
    items = leads.filter((l) => l.stage === stage);
  }
  res.json({ items, total: items.length });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { stage } = req.body || {};
  const lead = leads.find((x) => x.id === id);
  if (!lead) return res.status(404).json({ error: 'Lead not found' });
  if (stage) {
    lead.stage = stage;
    lead.updatedAt = new Date().toISOString();
    logActivity({ type: 'lead', message: `Lead ${lead.name} → ${stage}` });
  }
  res.json({ lead });
});

module.exports = router;
