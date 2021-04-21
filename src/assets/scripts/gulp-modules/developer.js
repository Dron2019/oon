// eslint-disable-next-line no-undef
const swiper = new Swiper('[data-saga-logos]', {
  slidesPerView: 3,
  spaceBetween: 30,
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
      slidesPerView: 3,
    },
  },
});
swiper.init();

// eslint-disable-next-line no-undef
const swiperPerfect = new Swiper('[data-perfect-logos]', {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: document.querySelector('[data-perfect-next]'),
    prevEl: document.querySelector('[data-perfect-prev]'),
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
      slidesPerView: 3,
    },
  },
});
swiperPerfect.init();
