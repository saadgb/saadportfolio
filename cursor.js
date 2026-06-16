(function () {
  // Touch / coarse-pointer devices get the system cursor
  if (window.matchMedia('(pointer: coarse)').matches) return;

  var dot  = document.createElement('div');
  var ring = document.createElement('div');
  dot.id  = 'c-dot';
  ring.id = 'c-ring';
  document.body.append(dot, ring);

  var mx = -300, my = -300;
  var rx = -300, ry = -300;

  // Dot follows the pointer instantly
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
  });

  // Ring follows with lerp lag (smooth trailing effect)
  (function tick() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.transform = 'translate(' + (rx - 16) + 'px,' + (ry - 16) + 'px)';
    requestAnimationFrame(tick);
  })();

  // Elements that trigger the hover (expanded ring) state
  var hoverSel = [
    'a', 'button', '.button', '[role="button"]',
    '.nav-cta', '.nav-links a',
    '.project-card', '.glass-card', '.skill-card',
    '.metric-card', '.cs-ds-item', '.cs-pt-card',
    '.cs-glance-card', '.cs-info-card', '.cs-overview-card',
    '.domain-panel', '.contact-card', 'label', 'input', 'textarea'
  ].join(',');

  function setActive(on) {
    dot.classList.toggle('c-active', on);
    ring.classList.toggle('c-active', on);
  }

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(hoverSel)) setActive(true);
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(hoverSel)) setActive(false);
  });

  // Hide when pointer leaves the viewport
  document.addEventListener('mouseleave', function () {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    dot.style.opacity  = '';
    ring.style.opacity = '';
  });
})();
