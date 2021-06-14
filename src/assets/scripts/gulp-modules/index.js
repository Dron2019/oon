
@@include('../libs/gsap/gsap.js')
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
  if (messageInStorage !== null) {
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
  menu.addEventListener('click',function(evt){

    if (evt.target.tagName === 'ASIDE'){
      this.classList.toggle('opened');
     }
    // evt.target.tagName === 'ASIDE' ? 
    //   this.classList.toggle('opened') : 
    //   null;
    // console.log();
  });
}
mobMenuHandle();


/**Подсветка активного пункта меню */
const asideLinks = document.querySelectorAll('aside a');
asideLinks.forEach(el=>{
  const href = el.getAttribute('href');
  if ( href !== undefined && window.location.href.match(href)) {
    console.log('ee');
    el.style.fontWeight = 800;
    el.style.pointerEvents = 'none';
    const parentGroupEl = el.closest('.aside__link-dropdown');
    if(parentGroupEl !== null) {
      parentGroupEl.querySelector('.aside__link-dropdown-title').style.fontWeight = 800;
    }
  };
});