const express = require('express');
const { bookings, reviews, leads, projects, activities } = require('../data/store');

const router = express.Router();

router.get('/stats', (_req, res) => {
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const pendingReviews = reviews.filter((r) => r.status === 'pending').length;
  const totalBookings = bookings.length;
  const activeProjects = projects.filter((p) => !/complete|sold out/i.test(p.status || '')).length;

  const stageCounts = leads.reduce((acc, l) => {
    acc[l.stage] = (acc[l.stage] || 0) + 1;
    return acc;
  }, {});

  const monthlyBars = [
    { month: 'Apr', value: 12 },
    { month: 'May', value: 18 },
    { month: 'Jun', value: 15 },
    { month: 'Jul', value: 22 },
    { month: 'Aug', value: 19 },
    { month: 'Sep', value: 24 },
    { month: 'Oct', value: 28 },
    { month: 'Nov', value: 31 },
    { month: 'Dec', value: 26 },
    { month: 'Jan', value: 33 },
    { month: 'Feb', value: 29 },
    { month: 'Mar', value: 35 }
  ];

  const revenueTrend = monthlyBars.map((m, i) => ({
    label: m.month,
    revenue: 1800000 + i * 120000 + (i % 3) * 90000
  }));

  const conversion = {
    inquiryToVisit: 42,
    visitToBooking: 28,
    leadToClose: 11
  };

  const inventory = {
    plotsAvailable: 9,
    plotsSold: 5,
    unitsUnderConstruction: 124
  };

  const upcoming = [...bookings]
    .filter((b) => b.preferredDate)
    .sort((a, b) => String(a.preferredDate).localeCompare(String(b.preferredDate)))
    .slice(0, 8)
    .map((b) => ({
      id: b.id,
      name: b.name,
      date: b.preferredDate,
      coach: b.coachType,
      status: b.status
    }));

  res.json({
    kpis: {
      bookings: totalBookings,
      pendingVisits: pendingBookings,
      reviews: reviews.length,
      activeProjects: activeProjects || projects.length
    },
    badges: {
      pendingBookings,
      pendingReviews
    },
    leadDistribution: Object.entries(stageCounts).map(([label, value]) => ({ label, value })),
    monthlyBars,
    revenueTrend,
    conversion,
    inventory,
    activity: activities.slice(0, 12),
    upcoming
  });
});

module.exports = router;
