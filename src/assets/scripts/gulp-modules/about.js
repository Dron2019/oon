/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

// eslint-disable-next-line no-undef
const aboutSlider = new Swiper('.swiper-container', {
  speed: 1000,
  loop: true,
  navigation: {
    nextEl: '[data-next]',
    prevEl: '[data-prev]',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
});
aboutSlider.init();
aboutSlider.on('beforeTransitionStart', () => {
  // eslint-disable-next-line no-undef
  gsap.fromTo('.swiper-container__bg', { x: '-120%' }, { x: '120%', duration: 1.5 });
});

locoScroll.stop();
document.querySelector('.page__content').removeAttribute('data-scroll-section');
document.querySelectorAll('.page-part').forEach((el) => { el.setAttribute('data-scroll-section', ''); });
locoScroll.start();
locoScroll.update();
locoScroll.on('scroll', () => {
  ScrollTrigger.update;
});

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return (arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y);
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.body.style.transform ? 'transform' : 'fixed',
});
ScrollTrigger.addEventListener('fixed', () => locoScroll.update());

ScrollTrigger.refresh();
gsap.registerPlugin(ScrollTrigger);


const $verticalDecorsBlocks = document.querySelectorAll('.subtitle-with-vertical-decor');
$verticalDecorsBlocks.forEach((block) => {
  ScrollTrigger.create({
    triggerHook: 'center',
    trigger: block,
    end: 'bottom',
    onEnter: () => {},
    onUpdate: (self) => {
      gsap.to(block, { backgroundPositionY: self.progress * 30 * self.direction * -1 });
    },
  });
});

const $blockRenovationBG = document.querySelectorAll('.about-block-renovations__bg');
$blockRenovationBG.forEach((block) => {
  const thisBlock = block;
  thisBlock.style.overflow = 'hidden';
  const img = thisBlock.querySelector('img');
  gsap.set(img, { scale: 1.15 });
  ScrollTrigger.create({
    triggerHook: 'center',
    trigger: thisBlock,
    end: 'bottom',
    onEnter: () => {},
    onUpdate: (self) => {
      if (self.progress < 0.5) gsap.to(img, { scale: 1.15 + ((self.progress * 0.25) * -1) });
    },
  });
});


const quoteCubes = document.querySelectorAll('[data-cubes-anim]');
// const cubesEasing = new BezierEasing(0.42,0,0.58,1);
const cubesEasing = new BezierEasing(0.48, 0.01, 0.5, 1);
quoteCubes.forEach((block) => {
  gsap.set(block.querySelectorAll('[data-from-right]'), { x: '100%', scale: 0.95 });
  gsap.set(block.querySelectorAll('[data-from-top]'), { y: '-100%', scale: 0.95 });
  gsap.set(block.querySelectorAll('[data-from-left]'), { x: '-100%', scale: 0.95 });
  gsap.set(block.querySelectorAll('[data-from-bottom]'), { y: '100%', scale: 0.95 });
  const tl = gsap.timeline({
    paused: true,
    timeScale: 0.5,
    scrollTrigger: {
      triggerHook: 0.5,
      trigger: block,
      end: '+=50%',
    },
  });
  tl.to(block.querySelectorAll('[data-cubes]'), {
    x: 0,
    y: 0,
    // ease: cubesEasing,
    duration: 0.95,
    scale: 1,
    // stagger: block.dataset.stagger !== undefined ? 0.02 : 0,
    ease: cubesEasing,
  });
});


const quoteImage = document.querySelectorAll('[data-quote-image]');
quoteImage.forEach((block) => {
  gsap.from(block, {
    scrollTrigger: block, // start the animation when ".box" enters the viewport (once)
    // scale: 0.8,
    duration: 1.6,
  });
});

const blockImg = document.querySelectorAll('[data-block-img]');

blockImg.forEach((block) => {
  gsap.from(block, {
    scrollTrigger: block, // start the animation when ".box" enters the viewport (once)
    scale: 1.1,
    duration: 1.6,
  });
});


const stdListIcons = document.querySelectorAll('[data-info-item-anim]');
const easingStdList = new BezierEasing(0.48, 0.01, 0.5, 1);
stdListIcons.forEach((item) => {
  const svg = item.querySelector('svg');
  const text = item.querySelector('.info-list-item__text');
  const DURATION = 0.75;
  const tl = gsap.timeline({
    // paused: true,
    timeScale: 0.5,
    scrollTrigger: {
      triggerHook: 0.75,
      trigger: item,
      // end: '+=50%',
    },
  });
  tl.from(svg, {
    // scrollTrigger: svg, // start the animation when ".box" enters the viewport (once)
    y: '-100%',
    duration: DURATION,
    easing: easingStdList,
  });
  tl.fromTo(text, {
    // scrollTrigger: text, // start the animation when ".box" enters the viewport (once)
    y: 30,
    autoAlpha: 0,
  },
  {
    // scrollTrigger: text, // start the animation when ".box" enters the viewport (once)
    y: 0,
    autoAlpha: 1,
    duration: DURATION,
    easing: easingStdList,
  }, '<');
});
