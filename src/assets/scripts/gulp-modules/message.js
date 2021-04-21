// eslint-disable-next-line no-undef
const swiper = new Swiper('[data-saga-logos]', {
  slidesPerView: 5,
  spaceBetween: 50,
  navigation: {
    nextEl: document.querySelector('[data-saga-next]'),
    prevEl: document.querySelector('[data-saga-prev]'),
  },
  breakpoints: {
    // when window width is >= 480px
    320: {
      slidesPerView: 1,
    },
    // when window width is >= 640px
    767: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 5,
    },
  },
});
swiper.init();
