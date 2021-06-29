import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Power4 from 'gsap/all';
import BezierEasing from 'bezier-easing';

global.gsap = gsap;

/** ******************************* */
/*
 * smooth scroll start
 */

/* eslint-disable-next-line */
window.locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  smoothMobile: false,
  inertia: 1.1,
});
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.refresh();
window.locoScroll.on('scroll', () => {
  // eslint-disable-next-line no-unused-expressions
  ScrollTrigger.update;
});

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return (arguments.length
      ? window.locoScroll.scrollTo(value, 0, 0)
      : window.locoScroll.scroll.instance.scroll.y);
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


window.locoScroll.on('scroll', (position, limit, speed, direction) => {
  ScrollTrigger.update;
});

window.locoScroll.on('update', (some) => {})
ScrollTrigger.addEventListener('fixed', () => window.locoScroll.update());


/* eslint-disable no-undef */
const mainScreenTransition = new BezierEasing(0.75, 0.01, 0.31, 1);

/*
 * smooth scroll end
 */
const paralaxSections = document.querySelectorAll('[data-home-paralax]');
paralaxSections.forEach((section) => {
  gsap.set(section, { y: '-50px' });
  ScrollTrigger.create({
    triggerHook: 'center',
    trigger: section,
    end: 'bottom',
    onEnter: () => {},
    onUpdate: (self) => {
      gsap.to(section, { y: `${(self.progress * 100) - 50}px` });
    },
  });
});
