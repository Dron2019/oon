/* eslint-disable no-unused-expressions */

/*
 *  start in
 */
// eslint-disable-next-line no-unused-vars
function animationPopapIn(settings) {
  // gsap.set([], {autoAlpha:0});
  const obj = { ...settings, paused: true };
  // eslint-disable-next-line no-undef
  const tl = gsap.timeline(obj);
  tl.fromTo(this.$popup, 1, { autoAlpha: 0 }, { autoAlpha: 1, immediateRender: false });
  return tl;
}
/*
 *  end in
 */
/*
 *  start Out
 */
// eslint-disable-next-line no-unused-vars
function animationPopapOut(settings) {
  // gsap.set([], {autoAlpha:0});
  const obj = { ...settings, paused: true };
  // eslint-disable-next-line no-undef
  const tl = gsap.timeline(obj);
  tl.fromTo(this.$popup, 1, { autoAlpha: 1 }, { autoAlpha: 0, clearProps: 'all', immediateRender: false });
  return tl;
}
/*
 *  end Out
 */
// eslint-disable-next-line no-unused-vars
class showModal {
  constructor(obj) {
    this.$popup = obj.$popup;
    this.$openBtn = obj.$openBtn;
    this.$closeBtn = obj.$closeBtn;
    this.attrParrentNode = obj.attrParrentNode;
    this.status = false;
    this.animationIn = obj.animationIn;
    this.animationOut = obj.animationOut;
    this.onOpenCompleteCallback = obj.onOpenCompleteCallback || function some() {};
    this.onCloseCompleteCallback = obj.onCloseCompleteCallback || function some() {};
    this.$body = document.querySelector('body');
    this.init();
  }


  get isOpen() {
    return this.status;
  }

  enableButton(butArg) {
    const btn = butArg;
    btn.disabled = false;
  }

  disableButton(butArg) {
    const btn = butArg;
    btn.disabled = true;
  }

  open() {
    this.onOpenCompleteCallback();
    const onComplete = () => {
      this.enableButton(this.$openBtn);
      this.status = true;
    };
    const onStart = () => this.disableButton(this.$openBtn);
    this.animationIn({ onComplete, onStart }).play();
  }

  close() {
    this.onCloseCompleteCallback();
    const onComplete = () => {
      this.enableButton(this.$openBtn);
      this.status = false;
    };
    const onStart = () => this.disableButton(this.$openBtn);
    this.animationOut({ onComplete, onStart }).play();
  }

  toggle() {
    if (this.status) {
      this.$body.classList.remove('modal-active');
      this.close();
    } else {
      this.$body.classList.add('modal-active');
      this.open();
    }
  }

  setStatus(status) {
    this.status = status;
  }

  listeners() {
    const self = this;
    this.$body.addEventListener('click', (evt) => {
      if (evt.target.closest(self.attrParrentNode) != null && !self.$openBtn.disabled) {
        evt.stopImmediatePropagation();
        self.toggle();
      }
    });
  }

  init() {
    this.listeners();
  }
}

const header = document.querySelector('header');
function handleVisibilityOnScroll(elems = [], direction = 'up') {
  elems.forEach((elem) => {
    direction === 'down'
      ? elem[0].classList.add(elem[1])
      : elem[0].classList.remove(elem[1]);
  });
}
// eslint-disable-next-line no-undef
locoScroll.on('scroll', (position) => {
  // eslint-disable-next-line no-undef
  ScrollTrigger.update;
  if (position.scroll.y > document.documentElement.clientWidth) {
    if (window.canvasEffectInterval) clearInterval(window.canvasEffectInterval);
    if (window.removeFirstPageEffect) window.removeFirstPageEffect();
  }
  if (position.scroll.y > 150) {
    handleVisibilityOnScroll([
      [header, 'not-on-top'],
      [document.querySelector('.uplink'), 'not-on-top'],
    ], 'down');
  } else {
    handleVisibilityOnScroll([
      [header, 'not-on-top'],
      [document.querySelector('.uplink'), 'not-on-top'],
    ]);
  }
});
document.querySelector('.uplink').addEventListener('click', () => {
  // eslint-disable-next-line no-undef
  if (locoScroll !== undefined) {
    // eslint-disable-next-line no-undef
    locoScroll.scrollTo(0);
  } else {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
});

const lazyImages = document.querySelectorAll('img[data-src]');

lazyImages.forEach((imageArgs) => {
  const image = imageArgs;
  image.style.opacity = 0;
  image.style.transition = ' .3s ease-out';
  image.addEventListener('load', () => {
    image.style.opacity = 1;
  });
  const options = {
    rootMargin: '0px',
    threshold: 0.1,
  };
  const callback = (entries) => {
    /* Content excerpted, show below */
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});
