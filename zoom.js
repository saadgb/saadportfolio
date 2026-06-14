document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('imageZoomOverlay');
  var overlayImg = overlay && overlay.querySelector('.image-zoom-content img');
  var closeButton = overlay && overlay.querySelector('.image-zoom-close');

  function showZoom(src, alt) {
    if (!overlay || !overlayImg) return;
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.classList.add('visible');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function hideZoom() {
    if (!overlay || !overlayImg) return;
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
    overlayImg.src = '';
    document.body.style.overflow = '';
  }

  window.showZoom = showZoom;
  window.hideZoom = hideZoom;

  if (!overlay || !overlayImg) return;

  document.querySelectorAll('main img').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      showZoom(img.src, img.alt);
    });
  });

  if (closeButton) closeButton.addEventListener('click', hideZoom);
  if (overlay) {
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) hideZoom();
    });
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') hideZoom();
  });
});
