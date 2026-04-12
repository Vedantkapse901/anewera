const express = require('express');
const { projects, logActivity } = require('../data/store');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ items: projects, total: projects.length });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body || {};
  const p = projects.find((x) => x.id === id);
  if (!p) return res.status(404).json({ error: 'Project not found' });
  ['name', 'sector', 'status', 'progress', 'slug'].forEach((k) => {
    if (body[k] !== undefined) p[k] = body[k];
  });
  if (body.progress !== undefined) p.progress = Math.min(100, Math.max(0, Number(body.progress)));
  logActivity({ type: 'project', message: `Project ${p.name} updated` });
  res.json({ project: p });
});

module.exports = router;
