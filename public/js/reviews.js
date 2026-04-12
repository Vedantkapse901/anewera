document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('review-trigger');
  const modal = document.getElementById('review-modal');
  const close = document.querySelector('[data-close-review]');
  const generate = document.getElementById('generate-review');
  const output = document.getElementById('generated-review');

  if (!trigger || !modal || !generate || !output) return;

  trigger.addEventListener('click', () => modal.classList.add('open'));
  close?.addEventListener('click', () => modal.classList.remove('open'));

  document.querySelectorAll('input[name="rating"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.review-star-option').forEach((label) => label.classList.remove('is-selected'));
      radio.closest('.review-star-option')?.classList.add('is-selected');
    });
  });
  document.querySelector('input[name="rating"]:checked')?.closest('.review-star-option')?.classList.add('is-selected');

  generate.addEventListener('click', () => {
    const reviewerName = document.getElementById('reviewer-name')?.value?.trim() || 'A valued client';
    const rating = Number(document.querySelector('input[name="rating"]:checked')?.value || 5);
    const notes = document.getElementById('rough-notes').value.trim();
    const tone = rating >= 4 ? 'distinguished and highly satisfying' : 'professional and transparent';
    const review = `— ${reviewerName}\n\nMy experience with A New Era Developers was ${tone}. ${notes || 'The team guided every milestone with clarity and discipline.'} I value their legal transparency, timely support, and premium planning standards.`;
    output.textContent = review;
  });

  document.getElementById('copy-review')?.addEventListener('click', async () => {
    if (!output.textContent.trim()) return;
    await navigator.clipboard.writeText(output.textContent.trim());
    window.open('https://search.google.com/local/writereview?placeid=ChIJ', '_blank');
  });
});
