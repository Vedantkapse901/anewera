const express = require('express');
const { bookings, logActivity } = require('../data/store');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ items: bookings, total: bookings.length });
});

router.post('/', (req, res) => {
  const { name, phone, email, preferredDate, coachType, persons } = req.body || {};
  if (!name || !phone) {
    return res.status(400).json({ error: 'name and phone are required' });
  }

  const booking = {
    id: `bk_${Date.now()}`,
    name,
    phone,
    email: email || '',
    preferredDate: preferredDate || '',
    coachType: coachType || 'Sleeper',
    persons: Number(persons || 1),
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(booking);
  logActivity({ type: 'booking', message: `New booking — ${name} (${preferredDate || 'date TBD'})` });
  return res.status(201).json({ message: 'Booking created', booking });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  const b = bookings.find((x) => x.id === id);
  if (!b) return res.status(404).json({ error: 'Booking not found' });
  if (status) {
    b.status = status;
    logActivity({ type: 'booking', message: `Booking ${id} → ${status}` });
  }
  res.json({ booking: b });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const idx = bookings.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Booking not found' });
  bookings.splice(idx, 1);
  logActivity({ type: 'booking', message: `Booking ${id} removed` });
  res.json({ ok: true });
});

module.exports = router;
