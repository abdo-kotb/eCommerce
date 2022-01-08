const slider = document.querySelector('.slider');

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
