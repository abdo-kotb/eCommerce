const slider = document.querySelector('.slider');

if (slider) {
  let isDown = false,
    startX,
    scrollLeft;

  const stopSlide = function () {
    isDown = false;
    this.classList.remove('active');
  };

  slider.addEventListener('mousedown', function (e) {
    this.classList.add('active');

    isDown = true;
    startX = e.pageX - this.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseup', stopSlide);
  slider.addEventListener('mouseleave', stopSlide);

  slider.addEventListener('mousemove', function (e) {
    if (!isDown) return;

    e.preventDefault();
    const x = e.pageX - this.offsetLeft;
    const move = x - startX;
    this.scrollLeft = scrollLeft - move;
  });
}

const lazyImgs = document.querySelectorAll('[data-behavior="lazy"]');

const revealImgs = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting || !entry) return;
    const { target } = entry;

    target.src = target.src.replace('-lazy', '');
    target.addEventListener('load', function () {
      target.classList.remove('lazy-img');
    });
    observer.unobserve(target);
  });
};

const observeLazy = new IntersectionObserver(revealImgs, {
  rootMargin: '100px',
});

lazyImgs.forEach(img => observeLazy.observe(img));

const rangeSlider = document.getElementById('slider');

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [0, 450],
    connect: true,
    tooltips: true,
    range: {
      min: 0,
      max: 500,
    },
  });
}

const marketImgs = document.querySelectorAll('.market__img');

marketImgs.forEach(img =>
  img.addEventListener('click', function () {
    const marketCard = img.closest('.market__card');
    marketCard.classList.toggle('bookmarked');
  })
);
