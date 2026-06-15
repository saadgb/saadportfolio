document.addEventListener('DOMContentLoaded', function () {
  var topButton = document.getElementById('scrollTopButton');
  if (!topButton) return;

  function updateTopButtonVisibility() {
    if (window.scrollY <= 10) {
      topButton.classList.add('hidden');
    } else {
      topButton.classList.remove('hidden');
    }
  }

  updateTopButtonVisibility();
  window.addEventListener('scroll', updateTopButtonVisibility, { passive: true });
  window.addEventListener('hashchange', updateTopButtonVisibility);
  window.addEventListener('pageshow', updateTopButtonVisibility);
});
