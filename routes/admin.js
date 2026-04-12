const express = require('express');

const router = express.Router();

let siteSettings = {
  updatedAt: new Date().toISOString(),
  source: 'server-default'
};

router.get('/settings', (_req, res) => {
  res.json({ settings: siteSettings });
});

router.put('/settings', (req, res) => {
  const payload = req.body || {};
  siteSettings = {
    ...siteSettings,
    ...payload,
    updatedAt: new Date().toISOString(),
    source: 'admin-api'
  };
  res.json({ message: 'Settings updated', settings: siteSettings });
});

module.exports = router;
