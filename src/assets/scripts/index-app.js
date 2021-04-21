import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';

import gsap from 'gsap';
import Power4 from 'gsap/all';
import BezierEasing from 'bezier-easing';
import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import ShowModal from '../../pug/components/popup/popup';
import SexyInput from '../../pug/components/input/input';
import handleSeoBlock from '../../pug/components/seo-block/seo-block';

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

/*
 * smooth scroll end
 */
/** ******************************* */

/* Seo block */

const seoBlocks = document.querySelectorAll('[data-seo-text]');
seoBlocks.forEach(handleSeoBlock);

/* Seo block END */

/** ******************************* */
/*
 * form handlers start
 */


const forms = [
  '[data-home-contact]',
];
const formsWithRedirect = [
  '[data-popup-form]',
];

formsWithRedirect.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => { window.location.href = 'message'; },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]'), typeInput: 'phone' }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },

      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
      console.log($form);
      $form.querySelector('[name="phone"]').focus();
    }, false);
  }
});

forms.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => { window.location.href = 'message'; },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]'), typeInput: 'phone' }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },

      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
      console.log($form);
      $form.querySelector('[name="phone"]').focus();
    }, false);
  }
});


// console.log(document.querySelector('[name="phone"]'));
/*
 * form handlers end
 */
/** ******************************* */
/*
 * popup menu start
 */

/*
 *  start in
 */
function animationPopapIn(settings) {
  // gsap.set([], {autoAlpha:0});
  const obj = { ...settings, paused: true };
  const tl = gsap.timeline(obj);
  tl.fromTo(this.$popup, 0.5, { scale: 1.1, autoAlpha: 0 },
    {
      autoAlpha: 1,
      immediateRender: false,
      duration: 0.25,
      scale: 1,
    });
  tl.fromTo(this.$popup.querySelector('form'),
    { webkitClipPath: 'circle(0% at 100% 0)' },
    // eslint-disable-next-line no-undef
    { webkitClipPath: 'circle(150% at 100% 0)', ease: Power4.easeOut, duration: 1 }, '<');
  // tl.fromTo(this.$popup.querySelectorAll('form>*'),
  //   { autoAlpha: 0, y: -30 },
  //   { autoAlpha: 1, y: 0 },
  //   '<+0.2');

  return tl;
}
/*
 *  end in
 */
/*
 *  start Out
 */
function animationPopapOut(settings) {
  // gsap.set([], {autoAlpha:0});
  const obj = { ...settings, paused: true };
  const tl = gsap.timeline(obj);
  tl.fromTo(this.$popup.querySelector('form'),
    { webkitClipPath: 'circle(150% at 100% 0)' },
    // eslint-disable-next-line no-undef
    { webkitClipPath: 'circle(0% at 100% 0)', ease: Power4.easeOut, duration: 1.25 });
  tl.fromTo(
    this.$popup,
    0.25,
    { autoAlpha: 1 },
    {
      autoAlpha: 0,
      clearProps: 'all',
      immediateRender: false,
      duration: 0.1,
    }, '<+0.2',
  );
  /*  */

  return tl;
}
/*
 *  end Out
 */
/** ******************************* */

/*  */
/*  */

/*  */
/*  */
/*  */
const popupBlockBtnOpen = document.querySelector('[data-call-popup-btn]');
const popupBlockBtnClose = document.querySelector('[data-call-popup-close]');
const popupBlock = document.querySelector('[data-call-popup-block]');
/*  */
/* eslint-disable-next-line */
const callPopap = new ShowModal({
  $popup: popupBlock,
  $openBtn: popupBlockBtnOpen,
  $closeBtn: popupBlockBtnClose,
  animationIn: animationPopapIn,
  animationOut: animationPopapOut,
  onOpenCompleteCallback: () => { document.querySelector('header').style.backgroundColor = 'white'; },
  onCloseCompleteCallback: () => { document.querySelector('header').style.backgroundColor = ''; },
  attrParrentNode: '[data-parrent-node-popup]',
});
/*  */
/*  */
/* MENU Behaviour COnfig */
const menuBlockBtnOpen = document.querySelector('[data-menu-btn]');
const menuBlockBtnClose = document.querySelector('[data-menu-popup-close]');
const menuBlock = document.querySelector('[data-menu-popup-block]');
const textCybesEasing = new BezierEasing(0.5, 0.01, 0.19, 1);
const menuCybesEasing = new BezierEasing(0.5, 0.01, 0.42, 1);
function cubesAnim() {
  const quoteCubes = document.querySelectorAll('.menu [data-cubes-anim]');
  const tlArray = [];
  quoteCubes.forEach((block) => {
    const tl = gsap.timeline({
      // paused: true,
    });
    tl.set(block.querySelectorAll('[data-from-right]'), { x: '100%', scale: 0.95 });
    tl.set(block.querySelectorAll('[data-from-top]'), { y: '-100%', scale: 0.95 });
    tl.set(block.querySelectorAll('[data-from-left]'), { x: '-100%', scale: 0.95 });
    tl.set(block.querySelectorAll('[data-from-bottom]'), { y: '100%', scale: 0.95 });
    tl.to(block.querySelectorAll('[data-cubes]'), {
      x: 0,
      y: 0,
      // ease: cubesEasing,
      duration: 0.5,
      scale: 1,
      stagger: 0.05,
      ease: menuCybesEasing,
    });
    tlArray.push(tl);
  });
  return tlArray;
}

function menuIn(settings) {
  const obj = { ...settings, paused: true };
  const tl = gsap.timeline(obj);
  tl.set(document.querySelectorAll('.menu__decor'), { autoAlpha: 0 });
  tl.set(this.$popup, { autoAlpha: 1, transformOrigin: 'right top' });
  tl.fromTo('[data-menu-aniumation-circle]', { clipPath: 'ellipse(4% 5% at 100% 0%)' },
    {
      clipPath: 'ellipse(150% 150% at 100% 0%)',
      scale: 1,
      immediateRender: false,
      ease: menuCybesEasing,
      duration: 1,
    });
  tl.fromTo('.menu__left', { x: '-100%' }, { x: 0, duration: 1, ease: menuCybesEasing }, '<');
  tl.fromTo('.menu-large-title', { x: '-100%' }, { x: 0, stagger: 0.1, ease: textCybesEasing }, '<+0.075');
  tl.fromTo('.menu__links-group .subtitle, .menu__links-group a',
    { autoAlpha: 0, y: 75 },
    { autoAlpha: 1, y: 0, stagger: 0.015 }, '<+0.5');
  tl.set(document.querySelectorAll('.menu__decor'), { autoAlpha: 1 }, '<');
  tl.add(cubesAnim(), '<');
  return tl;
}

function menuOut(settings) {
  const obj = { ...settings, paused: true };
  const tl = gsap.timeline(obj);
  tl.fromTo('.menu__links-group .subtitle, .menu__links-group a',
    { autoAlpha: 1, y: 0 },
    { autoAlpha: 0, y: 75, stagger: 0.015 });
  tl.fromTo('.menu-large-title', { x: 0 }, { x: '-100%', stagger: 0.05, ease: textCybesEasing }, '<+0.075');
  tl.fromTo('.menu__left', { x: 0 }, { x: '-100%', duration: 0.5, ease: menuCybesEasing }, '<');
  tl.fromTo('[data-menu-aniumation-circle]', { clipPath: 'ellipse(150% 150% at 100% 0%)' },
    {
      clipPath: 'ellipse(4% 5% at 100% 0%)',
      scale: 1,
      immediateRender: false,
      ease: menuCybesEasing,
      duration: 0.5,
    }, '<');
  tl.fromTo(
    this.$popup,
    0.25,
    { autoAlpha: 1 },
    {
      autoAlpha: 0,
      clearProps: 'all',
      immediateRender: false,
      duration: 0.1,
    },
    '<+0.5',
  );
  return tl;
}
/*  */
const changeTextNicely = (elArg, text) => {
  const element = elArg;
  const tl = gsap.timeline();
  tl.fromTo(element, { y: 0, autoAlpha: 1 }, { y: 10, autoAlpha: 0 });
  tl.add(() => { element.innerHTML = text; });
  tl.fromTo(element, { y: -10, autoAlpha: 0 }, { y: 0, autoAlpha: 1 });
  tl.duration(0.5).play();
};

const handleMenuOpenButton = (argInstance) => {
  const instance = argInstance;
  const tl = gsap.timeline({ duration: 0.5, paused: true });
  const reverseTl = gsap.timeline({ duration: 0.5, paused: true });
  const openButton = instance.$openBtn.querySelector('.header-menu__text');
  tl.to('.line__3', { scaleX: 0 });
  tl.to('.line__1', { rotate: -45, y: 6, width: 24 });
  tl.to('.line__2', { rotate: 45, width: 24 }, '<');
  reverseTl.to('.line__1', { rotate: 0, y: 0, width: 17 });
  reverseTl.to('.line__2', { rotate: 0, width: 17 }, '<');
  reverseTl.to('.line__3', { scaleX: 1 });
  if (instance.$popup.dataset.opened === 'true') {
    changeTextNicely(openButton, openButton.dataset.close || 'Закрити');
    tl.duration(0.5).play();
  } else {
    changeTextNicely(openButton, openButton.dataset.open || 'Меню');
    reverseTl.duration(0.5).play();
  }
};

function menuInMobile(settings) {
  const obj = { ...settings, paused: true };
  const tl = gsap.timeline(obj);
  tl.set(this.$popup, { autoAlpha: 1 });
  tl.fromTo(this.$popup,
    {
      x: '110vw', skewX: 5,
    },
    {
      x: 0, skewX: 0, duration: 0.75, ease: menuCybesEasing,
    });
  return tl;
}

function menuOutMobile(settings) {
  const obj = { ...settings, paused: true };
  const tl = gsap.timeline(obj);
  tl.fromTo(this.$popup, {
    x: 0, skewX: 0,
  }, {
    x: '110vw', skewX: 5, duration: 0.75, ease: menuCybesEasing,
  });
  tl.set(this.$popup, { autoAlpha: 0 });
  tl.reverse();
  return tl;
}

/* eslint-disable-next-line */
const menuPopap = new ShowModal({
  $popup: menuBlock,
  $openBtn: menuBlockBtnOpen,
  $closeBtn: menuBlockBtnClose,
  animationIn: document.documentElement.clientWidth < 576 ? menuInMobile : menuIn,
  animationOut: document.documentElement.clientWidth < 576 ? menuOutMobile : menuOut,
  attrParrentNode: '[data-parrent-node-menu]',
  onOpenCompleteCallback: () => {
    const self = menuPopap;
    self.$popup.dataset.opened = true;
    handleMenuOpenButton(self);
  },
  onCloseCompleteCallback: () => {
    const self = menuPopap;
    self.$popup.dataset.opened = false;
    handleMenuOpenButton(self);
  },
});
/* MENU Behaviour COnfig END */

/* anchor links handler in locomotive scroll START */
window.addEventListener('load', () => {
  const anchor = document.querySelector(`[data-anchor="${window.location.hash}"]`);
  // eslint-disable-next-line no-undef
  if (anchor !== null && locoScroll !== undefined) {
    // eslint-disable-next-line no-undef
    locoScroll.scrollTo(anchor, { offset: -150 });
  }
});
/* anchor links handler in locomotive scroll END */
