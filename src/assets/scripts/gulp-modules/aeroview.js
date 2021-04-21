/* eslint-disable no-undef */
if (locoScroll !== undefined) locoScroll.destroy();

const switcher = document.querySelector('[data-panorama-switcher]');
const panorama = document.querySelector('[data-panorama]');
const switchUrls = [
  switcher.dataset.day || '',
  switcher.dataset.night || '',
];
const easeOut = new BezierEasing(0, 0.91, 0.53, 1);
const easeIn = new BezierEasing(0.86, 0.01, 1, 0.24);
switcher.addEventListener('change', (evt) => {
  const tl = gsap.timeline();
  tl.to(panorama, { autoAlpha: 0, duration: 0.5, ease: easeOut });
  tl.add(() => { panorama.src = switchUrls[+evt.target.checked]; });
  tl.add(() => { panorama.src = switchUrls[+evt.target.checked]; });
  tl.to(panorama, { autoAlpha: 1, duration: 0.5, ease: easeIn }, '<');
});
