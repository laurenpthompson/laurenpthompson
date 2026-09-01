(function () {
  function initSlideshow(root) {
    var slides = root.querySelectorAll('.slide');
    var dotsContainer = root.querySelector('.slide-dots');
    var caption = root.querySelector('figcaption');
    var prevBtn = root.querySelector('.prev');
    var nextBtn = root.querySelector('.next');
    var current = 0;

    slides.forEach(function (slide, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
      dotsContainer.appendChild(dot);
    });
    var dots = root.querySelectorAll('.dot');

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
      caption.textContent = slides[current].getAttribute('data-caption');
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    root.setAttribute('tabindex', '0');
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
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
