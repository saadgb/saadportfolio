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

  function initIntelMapAnimation() {
    function waapiFallback() {
      try {
        var map = document.querySelector('.intel-map');
        if (!map) return;
        var nodes = map.querySelectorAll('.node');
        var configs = [
          { x: 0, y: -10, duration: 2800 },
          { x: 0, y: 12, duration: 3200 },
          { x: 10, y: 0, duration: 3600 },
          { x: -8, y: -8, duration: 3400 },
          { x: -18, y: -8, duration: 3800 }
        ];
        nodes.forEach(function (node, i) {
          var c = configs[i] || configs[0];
          if (node.animate) {
            node.animate(
              [
                { transform: 'translate(0px, 0px)' },
                { transform: 'translate(' + c.x + 'px, ' + c.y + 'px)' }
              ],
              { duration: c.duration, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }
            );
          } else {
            var dir = 1;
            var pos = 0;
            var max = Math.max(Math.abs(c.x), Math.abs(c.y)) || 10;
            setInterval(function () {
              pos += dir * 1;
              if (Math.abs(pos) >= max) dir *= -1;
              node.style.transform = 'translate(' + (c.x ? (pos * c.x / max) : 0) + 'px, ' + (c.y ? (pos * c.y / max) : 0) + 'px)';
            }, 50);
          }
        });
      } catch (err) {
        console.warn('intel-map WAAPI fallback failed', err);
      }
    }

    function runIntelMapAnimation() {
      if (window.gsap) {
        try {
          if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
          gsap.to('.node.one', { y: -10, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
          gsap.to('.node.two', { y: 12, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
          gsap.to('.node.three', { x: 10, duration: 3.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
          gsap.to('.node.four', { x: -8, y: -8, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
          gsap.to('.node.five', { x: -18, y: -8, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
          return;
        } catch (err) {
          console.warn('intel-map GSAP animation failed', err);
        }
      }
      waapiFallback();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runIntelMapAnimation);
    } else {
      runIntelMapAnimation();
    }
  }

  initIntelMapAnimation();
});
