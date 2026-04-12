const express = require('express');
const { reviews, logActivity } = require('../data/store');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ items: reviews, total: reviews.length });
});

router.post('/', (req, res) => {
  const { name, rating, text } = req.body || {};
  if (!name || !rating || !text) {
    return res.status(400).json({ error: 'name, rating, and text are required' });
  }

  const review = {
    id: `rv_${Date.now()}`,
    name,
    rating: Number(rating),
    text,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  reviews.unshift(review);
  logActivity({ type: 'review', message: `Review submitted — ${name} (${rating}★)` });
  return res.status(201).json({ message: 'Review submitted', review });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  const r = reviews.find((x) => x.id === id);
  if (!r) return res.status(404).json({ error: 'Review not found' });
  if (status === 'approved' || status === 'pending') {
    r.status = status;
    logActivity({ type: 'review', message: `Review ${id} → ${status}` });
  }
  res.json({ review: r });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const idx = reviews.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Review not found' });
  reviews.splice(idx, 1);
  logActivity({ type: 'review', message: `Review ${id} deleted` });
  res.json({ ok: true });
});

module.exports = router;
