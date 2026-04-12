document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  }, 2000);
});
