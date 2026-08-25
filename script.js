(function () {
  var PIXELS_PER_SECOND = 32; // scroll speed for the news reels

  function initReel(root) {
    var track = root.querySelector('.reel-track');
    if (!track) return;

    var items = Array.prototype.slice.call(track.children);
    if (items.length === 0) return;

    // Duplicate the set once so the strip can loop seamlessly.
    items.forEach(function (item) {
      track.appendChild(item.cloneNode(true));
    });

    var singleSetWidth = track.scrollWidth / 2;
    var duration = singleSetWidth / PIXELS_PER_SECOND;
    track.style.animationDuration = duration + 's';
  }

  document.querySelectorAll('.reel').forEach(initReel);
})();
