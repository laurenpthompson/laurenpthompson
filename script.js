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

  function initAbstract(block) {
    var text = block.querySelector('.annotated-text');
    var btn = block.querySelector('.read-more-btn');
    if (!text || !btn) return;

    btn.addEventListener('click', function () {
      var collapsed = text.classList.toggle('collapsed');
      btn.textContent = collapsed ? 'Read more' : 'Read less';
    });
  }

  document.querySelectorAll('.slideshow').forEach(initSlideshow);
  document.querySelectorAll('.abstract-block').forEach(initAbstract);
})();
