document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('booking-flow');
  if (!form) return;
  const saved = readSettings();
  const whatsappNumber = String(saved.whatsappNumber || saved.phone || '917208324505').replace(/[^\d]/g, '');

  const steps = [...document.querySelectorAll('[data-step]')];
  const indicators = [...document.querySelectorAll('[data-step-indicator]')];
  let current = 1;

  const update = () => {
    steps.forEach((step) => step.classList.toggle('hidden', Number(step.dataset.step) !== current));
    indicators.forEach((dot) => {
      const num = Number(dot.dataset.stepIndicator);
      dot.classList.toggle('bg-blue-900', num === current);
      dot.classList.toggle('text-white', num <= current);
      dot.classList.toggle('bg-green-700', num < current);
    });
    const bar = document.getElementById('booking-progress');
    if (bar) bar.style.width = `${(current / 3) * 100}%`;
  };

  form.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches('[data-next]') && current < 3) current += 1;
    if (target.matches('[data-back]') && current > 1) current -= 1;
    update();
  });

  document.getElementById('confirm-booking-wa')?.addEventListener('click', () => {
    const name = document.getElementById('booking-name')?.value?.trim() || 'Not shared';
    const phone = document.getElementById('booking-phone')?.value?.trim() || 'Not shared';
    const email = document.getElementById('booking-email')?.value?.trim() || 'Not shared';
    const date = document.getElementById('booking-date')?.value?.trim() || 'Not shared';
    const coach = document.getElementById('booking-coach')?.value?.trim() || 'Not shared';
    const persons = document.getElementById('booking-persons')?.value?.trim() || 'Not shared';
    const message = `Site visit booking request\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nPreferred date: ${date}\nCoach type: ${coach}\nPersons: ${persons}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  });

  update();
});

function readSettings() {
  const raw = localStorage.getItem('aneweraSiteSettings');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (error) {
    return {};
  }
}
