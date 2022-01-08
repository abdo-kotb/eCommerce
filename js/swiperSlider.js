const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  spaceBetween: 50,
  centeredSlides: true,
  slidesPerView: 1,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    992: {
      slidesPerView: 4,
    },
  },
});
