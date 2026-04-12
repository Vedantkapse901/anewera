require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const bookingsRouter = require('./routes/bookings');
const reviewsRouter = require('./routes/reviews');
const adminRouter = require('./routes/admin');
const leadsRouter = require('./routes/leads');
const projectsApiRouter = require('./routes/projects-api');
const dashboardRouter = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

app.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'anewera-web',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

app.use('/api/bookings', bookingsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/projects', projectsApiRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/admin', adminRouter);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({
    error: 'Internal Server Error',
    message: err && err.message ? err.message : 'Unknown error'
  });
});

app.listen(PORT, () => {
  console.log(`A New Era server running at http://localhost:${PORT}`);
});
