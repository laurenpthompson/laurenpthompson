(function () {
  function initSlideshow(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('.slide'));
    var dotsContainer = root.querySelector('.slide-dots');
    var caption = root.querySelector('figcaption');
    var prevBtn = root.querySelector('.prev');
    var nextBtn = root.querySelector('.next');
    var current = 0;
    var animating = false;

    slides.forEach(function (slide, i) {
      if (slide.classList.contains('active')) current = i;

      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
      dotsContainer.appendChild(dot);
    });
    var dots = root.querySelectorAll('.dot');

    function goTo(index, direction) {
      var nextIndex = (index + slides.length) % slides.length;
      if (nextIndex === current || animating) return;
      if (direction === undefined) direction = nextIndex > current ? 1 : -1;
      animating = true;

      var outgoing = slides[current];
      var incoming = slides[nextIndex];

      // Place the incoming slide just off-screen on the side it should enter from
      incoming.style.transition = 'none';
      incoming.style.transform = 'translateX(' + (direction * 100) + '%)';
      incoming.classList.add('active');
      void incoming.offsetWidth; // force reflow so the starting position registers
      incoming.style.transition = '';

      requestAnimationFrame(function () {
        incoming.style.transform = 'translateX(0)';
        outgoing.style.transform = 'translateX(' + (-direction * 100) + '%)';
      });

      function cleanup() {
        outgoing.classList.remove('active');
        outgoing.style.transition = 'none';
        outgoing.style.transform = '';
        void outgoing.offsetWidth;
        outgoing.style.transition = '';
        incoming.style.transform = '';
        outgoing.removeEventListener('transitionend', cleanup);
        animating = false;
      }
      outgoing.addEventListener('transitionend', cleanup);

      dots[current].classList.remove('active');
      dots[nextIndex].classList.add('active');
      caption.textContent = incoming.getAttribute('data-caption');
      current = nextIndex;
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1, -1); });
    nextBtn.addEventListener('click', function () { goTo(current + 1, 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    root.setAttribute('tabindex', '0');
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') goTo(current - 1, -1);
      if (e.key === 'ArrowRight') goTo(current + 1, 1);
    });
  }

  document.querySelectorAll('.slideshow').forEach(initSlideshow);

  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var img = lightbox.querySelector('img');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var lastFocused = null;

    function open(src, alt) {
      lastFocused = document.activeElement;
      img.src = src;
      img.alt = alt || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      img.src = '';
      if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll('.view-larger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        open(btn.getAttribute('data-full'), btn.getAttribute('data-alt'));
      });
    });

    closeBtn.addEventListener('click', close);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
    });
  }

  initLightbox();
})();
