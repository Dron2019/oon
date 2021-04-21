/* eslint-disable no-undef */
locoScroll.stop();
document.querySelector('.page__content').removeAttribute('data-scroll-section');
document.querySelectorAll('.page-part').forEach((el) => { el.setAttribute('data-scroll-section', ''); });
locoScroll.start();
locoScroll.update();
locoScroll.on('scroll', () => {
  // eslint-disable-next-line no-unused-expressions
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


const blockImg = document.querySelectorAll('[data-block-img]');

blockImg.forEach((block) => {
  gsap.from(block, {
    scrollTrigger: block, // start the animation when ".box" enters the viewport (once)
    scale: 1.1,
    duration: 1.6,
  });
});


const blockBg = document.querySelectorAll('[data-block-decor]');
blockBg.forEach((block) => {
  const tl = gsap.timeline({
    paused: true,
    timeScale: 0.5,
    scrollTrigger: {
      triggerHook: 0.5,
      trigger: block,
      end: '+=50%',
      scrub: true,
    },
  });
  tl.fromTo(block, {
    x: 0,
    y: 0,
    // ease: cubesEasing,
    duration: 0.95,
    backgroundPositionY: '1px',
    // stagger: block.dataset.stagger !== undefined ? 0.02 : 0,
    // ease: cubesEasing,
  }, {
    backgroundPositionY: '50px',
  });
});
