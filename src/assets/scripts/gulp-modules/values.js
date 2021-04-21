
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const slider = document.querySelector('[data-slider]');
const unactiveWidth = getComputedStyle(slider.querySelectorAll('.slide')[1]).width;
const unactiveHeight = getComputedStyle(slider.querySelectorAll('.slide')[1]).height;
const transitionEasing = new BezierEasing(0.79, 0.01, 0.32, 0.99);
const transitionDuration = document.documentElement.clientWidth > 575 ? 1.25 : 0.75;
slider.style.setProperty('--js-transition', `${transitionDuration}s`);
slider.style.setProperty('--slides-count', slider.querySelectorAll('.slide').length);

function animateSlideTransfer(slide) {
  const activeSlide = slide.parentElement.querySelector('.active');
  const activeWidth = getComputedStyle(activeSlide).width;
  const tl = gsap.timeline();
  tl.set(slider, { pointerEvents: 'none' });
  tl.add(() => {
    slide.classList.add('active');
  });
  tl.fromTo(activeSlide,
    { width: activeWidth },
    { width: unactiveWidth, ease: transitionEasing, duration: transitionDuration });
  tl.fromTo(activeSlide.querySelectorAll('.slide__content>*'),
    { autoAlpha: 1, y: 0 },
    { autoAlpha: 0, y: -20, stagger: 0.1 }, '<');
  tl.fromTo(activeSlide.querySelector('img'),
    { scale: 1 },
    { scale: 1.1, ease: transitionEasing, duration: transitionDuration }, '<');
  tl.fromTo(slide.querySelector('img'),
    { scale: 1.1 },
    { scale: 1, ease: transitionEasing, duration: transitionDuration }, '<');
  tl.fromTo(slide,
    { width: unactiveWidth },
    { width: activeWidth, ease: transitionEasing, duration: transitionDuration },
    '<');
  tl.add(() => {
    activeSlide.classList.remove('active');
  }, '<');
  tl.fromTo(slide.querySelectorAll('.slide__content>*'),
    { autoAlpha: 0, y: -20 },
    { autoAlpha: 1, y: 0, stagger: 0.1 },
    '-=0.5');
  tl.set(slider, { pointerEvents: 'all' });
}

function animateSlideTransferHeight(block) {
  const activeSlide = block.parentElement.querySelector('.active');
  const activeHeight = getComputedStyle(activeSlide).height;
  const tl = gsap.timeline();
  tl.set(slider, { pointerEvents: 'none' });
  tl.add(() => {
    block.classList.add('active');
  });
  tl.fromTo(activeSlide,
    { height: activeHeight },
    { height: unactiveHeight, ease: transitionEasing, duration: transitionDuration });
  tl.fromTo(activeSlide.querySelectorAll('.slide__content>*'),
    { autoAlpha: 1, y: 0 },
    { autoAlpha: 0, y: -20, stagger: 0.1 }, '<');
  tl.fromTo(activeSlide.querySelector('img'),
    { scale: 1 },
    { scale: 1.1, ease: transitionEasing, duration: transitionDuration }, '<');
  tl.fromTo(block.querySelector('img'),
    { scale: 1.1 },
    { scale: 1, ease: transitionEasing, duration: transitionDuration }, '<');
  tl.fromTo(block,
    { height: unactiveHeight },
    { height: activeHeight, ease: transitionEasing, duration: transitionDuration },
    '<');
  tl.add(() => {
    activeSlide.classList.remove('active');
  }, '<');
  tl.fromTo(block.querySelectorAll('.slide__content>*'),
    { autoAlpha: 0, y: -20 },
    { autoAlpha: 1, y: 0, stagger: 0.1 },
    '-=0.5');
  tl.set(slider, { pointerEvents: 'all' });
}
function configSlideBehavior(slide) {
  slide.addEventListener('click', () => {
    (document.documentElement.clientWidth > 768)
      ? animateSlideTransfer(slide)
      : animateSlideTransferHeight(slide);

    clearInterval(slider.slideAutoPlay);
  });
  slider.addEventListener('click', () => { clearInterval(slider.slideAutoPlay); });
  window.addEventListener('blur', () => { clearInterval(slider.slideAutoPlay); });
}

slider.querySelectorAll('.slide').forEach(configSlideBehavior);

let indexSl = 1;
slider.slideAutoPlay = setInterval(() => {
  (document.documentElement.clientWidth > 768)
    ? animateSlideTransfer(slider.querySelectorAll('.slide')[indexSl])
    : animateSlideTransferHeight(slider.querySelectorAll('.slide')[indexSl]);
  // console.log(indexSl);
  indexSl === slider.querySelectorAll('.slide').length - 1 ? indexSl = 0 : indexSl += 1;
}, 5000);


/* ПОдмена картинок на мобильной версии если такие есть */
if (document.documentElement.clientWidth < 576) {
  document.querySelectorAll('[data-mob]').forEach((mobImg) => {
    const img = mobImg;
    img.src = img.dataset.mob;
  });
}
