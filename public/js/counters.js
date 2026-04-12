document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.counter);
      countTo(el, target);
      observer.unobserve(el);
    });
  }, { threshold: 0.35 });

  counters.forEach((counter) => observer.observe(counter));
});

function countTo(element, target) {
  const start = performance.now();
  const duration = 1400;
  const animate = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    element.textContent = Math.floor(progress * target).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}
