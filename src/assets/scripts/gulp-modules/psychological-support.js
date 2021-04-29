/* Акордеончики */
const accordeons = document.querySelectorAll('[data-accordeon]');
accordeons.forEach((accordeon) => {
  // const openButton = accordeon.querySelector('svg');
  const innerContent = accordeon.querySelector('[class*="inner"]');
  const hiddenWhileOpened = accordeon.querySelector('[data-hidden-while-opened]');
  gsap.set(hiddenWhileOpened, { transformOrigin: 'center' });
  accordeon.addEventListener('click', () => {
    accordeon.classList.toggle('opened');
    if (accordeon.classList.contains('opened')) {
      gsap.to(hiddenWhileOpened, { scaleY: 0 });
      gsap.fromTo(innerContent, { height: 0 }, { height: innerContent.scrollHeight });
    } else {
      gsap.to(hiddenWhileOpened, { scaleY: 1 });
      gsap.fromTo(innerContent, { height: innerContent.scrollHeight }, { height: 0 });
    }
    setTimeout(() => {
      try {
        locoScroll.update();
      } catch (error) {}
    }, 1000);
  });
});