document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(max-width: 767px)').matches) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let ringX = 0;
  let ringY = 0;

  window.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    dot.style.left = `${clientX}px`;
    dot.style.top = `${clientY}px`;
    ringX += (clientX - ringX) * 0.18;
    ringY += (clientY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
  });
});
