/* eslint-disable no-undef */
const frame = document.querySelector('[data-webcam-frame]');
const $tabs = document.querySelectorAll('[data-src]');
const tabsEasing = new BezierEasing(0.48, 0, 0.61, 0.99);
$tabs.forEach((argTab) => {
  const tab = argTab;
  tab.onclick = () => {
    if (frame.src !== tab.dataset.src) frame.src = tab.dataset.src;
    frame.parentElement.parentElement.style.backgroundColor = getComputedStyle(tab).backgroundColor;
  };
});

window.addEventListener('load', () => {
  if (document.documentElement.clientWidth > 576) {
    gsap.from($tabs, {
      x: '-100%',
      stagger: 0.1,
      easing: tabsEasing,
      duration: 1.25,
    });
  } else {
    gsap.from($tabs, {
      y: '100%',
      stagger: 0.1,
      easing: tabsEasing,
      duration: 1.25,
    });
  }
});
