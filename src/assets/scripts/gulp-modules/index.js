@@include('../libs/gsap/gsap.js')
;;;
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



function renderNewMessagesInAsideButton(){
  const menuCabinetLink = document.querySelector('[data-new-messages]');
  const messageInformerElement = menuCabinetLink.closest('svg');
  const messageInStorage = window.localStorage.getItem('newMessages');
  if (+messageInStorage > 0) {
    menuCabinetLink.innerHTML =  messageInStorage;
    messageInformerElement.style.opacity = 1;
  }else {
    messageInformerElement.style.opacity = 0;
  }
}
window.addEventListener('load', renderNewMessagesInAsideButton);
window.addEventListener('storage', renderNewMessagesInAsideButton);



function handleNextPageButtons(){
  const buttons = document.querySelectorAll('[data-down-button]');
  buttons.forEach(el=>{
    el.addEventListener('click',function(evt){
      const nextPage = el.closest('.page-part').nextElementSibling;
      if (nextPage) nextPage.scrollIntoView({ behavior: 'smooth' });
    });
  })
}
handleNextPageButtons();



/*Панель поиска */
function handleSearchPanel(){
  const call = document.querySelector('[data-call-search-panel]');
  const panel = document.querySelector('[data-search-panel]');
  const close = panel.querySelector('[data-close-search-panel]');
  const pageInner = document.querySelector('.page__inner');
  const className = 'active';
  const pageInnerBlockClass = 'opened-popup';
  
  call.addEventListener('click', ()=>pageInner.classList.add(pageInnerBlockClass));
  call.addEventListener('click', ()=>panel.classList.add(className));
  
  close.addEventListener('click', ()=>panel.classList.remove(className));
  close.addEventListener('click', ()=>pageInner.classList.remove(pageInnerBlockClass));

  window.addEventListener('click',function(evt){
    if (
      evt.target.closest('[data-search-panel]')===null &&
      evt.target.closest('[data-call-search-panel]') === null
    ) {
      panel.classList.remove(className);
      pageInner.classList.remove(pageInnerBlockClass);
    }
  });
}
handleSearchPanel();



//mobile menu handle
function mobMenuHandle(){
  const menu = document.querySelector('aside');
  const pageInner = document.querySelector('.page__inner');
  const moveCords = {
    x: 0,
    swipeDistance: 0,
    locked: true,
    percentForClosing: 50, 
  }

  menu.addEventListener('click',function(evt){

    if (evt.target.tagName === 'ASIDE'){
      this.classList.toggle('opened');
     }
    // evt.target.tagName === 'ASIDE' ? 
    //   this.classList.toggle('opened') : 
    //   null;
    // console.log();
  });
  
  window.addEventListener('touchstart', (e) => {
    moveCords.x = e.changedTouches[0].clientX;
    moveCords.locked = false;
    menu.style.transition = 'none';
  });
  window.addEventListener('touchmove', (e) => {
    if (moveCords.locked === false && e.changedTouches[0].clientX < moveCords.x && menu.classList.contains('opened'))  {
      moveCords.swipeDistance = moveCords.x - e.changedTouches[0].clientX;
      menu.style.transform = `translateX(-${moveCords.x - e.changedTouches[0].clientX}px)`;
    }
  });
  window.addEventListener('touchend', (e) => {
    if (moveCords.swipeDistance > menu.getBoundingClientRect().width * (moveCords.percentForClosing / 100)) {
      menu.classList.remove('opened');
    }
    menu.style.transform = '';
    moveCords.swipeDistance = 0;
    moveCords.x = 0;
    moveCords.locked = true;
    menu.style.transition = '';
  });
}
mobMenuHandle();


document.addEventListener("click", function(evt) {
  var flyoutElement = document.querySelector('aside'),
      targetElement = evt.target;  // clicked element

  do {
      if (targetElement == flyoutElement) {
          // This is a click inside. Do nothing, just return.
          // document.querySelector("aside").textContent = "Clicked inside!";
          return;
      }
      // Go up the DOM
      targetElement = targetElement.parentNode;
  } while (targetElement);

  document.documentElement.clientWidth < 576 ? 
    flyoutElement.classList.remove('opened') :
    null;
  // This is a click outside.
  // document.getElementById("aside").textContent = "Clicked outside!";
});

/**Подсветка активного пункта меню */
const asideLinks = document.querySelectorAll('aside a:not(.button-std)');
asideLinks.forEach(el=>{
  const href = el.getAttribute('href');
  if ( href !== undefined && href !== '/' && window.location.href.match(href)) {
    console.log(el);
    el.style.fontWeight = 800;
    el.style.pointerEvents = 'none';
    const parentGroupEl = el.closest('.aside__link-dropdown');
    if(parentGroupEl !== null) {
      parentGroupEl.querySelector('.aside__link-dropdown-title').style.fontWeight = 800;
    }
  };
});
// gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.refresh();

// const paralaxSections = document.querySelectorAll('[data-home-paralax]');
// paralaxSections.forEach((section) => {
//   gsap.set(section, { backgroundPositionY: '-50px' });
//   ScrollTrigger.create({
//     triggerHook: 'center',
//     trigger: section,
//     end: 'bottom',
//     onEnter: () => {},
//     onUpdate: (self) => {
//       gsap.to(section, { backgroundPositionY: `${(self.progress * 100) - 50}px` });
//     },
//   });
// });



/**
 * mobile menu open on swipe
 */

function mobMenuOpenOnSwipe() {
  const menu = document.querySelector('aside');
  const moveCords = {
    x: 0,
    startX: 0,
    swipeDistance: 0,
    locked: true,
    percentForOpening: 50, 
    swipeDiapasonForEffectStart: 20,
    menuWidth: menu.getBoundingClientRect().width,
    screenWidth: document.documentElement.clientWidth,
  }
  window.addEventListener('touchstart',function(evt){
    moveCords.startX = evt.changedTouches[0].pageX;
    const startedPercentOfSwiping = (moveCords.startX * 100) / moveCords.screenWidth;


    if (startedPercentOfSwiping > moveCords.swipeDiapasonForEffectStart) return;
    menu.style.transition = 'none';
    moveCords.locked = false;
  });
  window.addEventListener('touchmove',function(evt){
    if (moveCords.locked === false) evt.preventDefault();
    if (menu.classList.contains('opened')) return;
    moveCords.swipeDistance = evt.changedTouches[0].pageX - moveCords.startX;
    if (moveCords.locked === false) menu.style.transform = `translateX(${Math.min((moveCords.swipeDistance - moveCords.menuWidth), 0)}px)`;
  });
  window.addEventListener('touchend',function(evt){
    if (moveCords.locked) return;
    if (moveCords.swipeDistance > (moveCords.menuWidth * 0.5)) menu.classList.add('opened');
    moveCords.swipeDistance = 0;
    menu.style.transform = '';
    menu.style.transition = '';
    moveCords.locked = true;
  });
}
mobMenuOpenOnSwipe();