document.addEventListener('DOMContentLoaded', () => {
  const cards = [...document.querySelectorAll('.project-card')];
  const tabs = [...document.querySelectorAll('[data-filter]')];
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');
  const closeButtons = document.querySelectorAll('[data-close-modal]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const value = tab.dataset.filter;
      tabs.forEach((t) => t.setAttribute('aria-pressed', 'false'));
      tab.setAttribute('aria-pressed', 'true');
      cards.forEach((card) => {
        const show = value === 'all' || card.dataset.sector === value;
        card.style.display = show ? 'block' : 'none';
      });
    });
  });

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const landSlug = card.getAttribute('data-land-slug');
      if (landSlug) {
        window.location.href = `project-land.html?project=${encodeURIComponent(landSlug)}`;
        return;
      }
      if (!modal || !modalBody) {
        window.location.href = 'booking.html';
        return;
      }
      modalBody.innerHTML = `
        <h3 class="font-heading text-3xl mb-3">${card.dataset.title}</h3>
        <p class="mb-4">${card.dataset.description}</p>
        <p class="mb-6"><strong>Amenities:</strong> Legal scrutiny, infrastructure support, curated advisory.</p>
        <a class="btn-royal" href="booking.html">Book a Priority Visit</a>
      `;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!modal) return;
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.classList.contains('open')) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});
