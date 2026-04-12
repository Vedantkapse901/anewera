document.addEventListener('DOMContentLoaded', () => {
  const calculateBtn = document.getElementById('calc-btn');
  if (!calculateBtn) return;

  calculateBtn.addEventListener('click', () => {
    const area = Number(document.getElementById('plot-area').value || 0);
    const purchaseYear = Number(document.getElementById('purchase-year').value || 0);
    const saleYear = Number(document.getElementById('sale-year').value || 0);
    const years = Math.max(1, saleYear - purchaseYear);
    const principal = area * 12000;

    const scenarios = [
      { id: 'conservative', rate: 0.09 },
      { id: 'moderate', rate: 0.14 },
      { id: 'optimistic', rate: 0.2 }
    ];

    scenarios.forEach((scenario) => {
      const futureValue = Math.round(principal * Math.pow(1 + scenario.rate, years));
      const bar = document.querySelector(`[data-bar="${scenario.id}"]`);
      const value = document.querySelector(`[data-value="${scenario.id}"]`);
      if (bar) bar.style.width = `${Math.min(100, 25 + scenario.rate * 300)}%`;
      if (value) animateCount(value, futureValue);
    });
  });
});

function animateCount(element, endValue) {
  const duration = 850;
  const start = performance.now();
  const from = 0;
  const step = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const val = Math.floor(from + (endValue - from) * progress);
    element.textContent = `₹${val.toLocaleString('en-IN')}`;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
