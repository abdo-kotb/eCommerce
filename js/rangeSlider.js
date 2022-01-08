const rangeSlider = document.getElementById('slider');

noUiSlider.create(rangeSlider, {
  start: [0, 450],
  connect: true,
  tooltips: true,
  range: {
    min: 0,
    max: 500,
  },
});
