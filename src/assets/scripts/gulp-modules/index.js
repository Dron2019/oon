

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
