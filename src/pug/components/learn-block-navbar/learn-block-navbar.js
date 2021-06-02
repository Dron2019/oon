
window.addEventListener('DOMContentLoaded', (evt) => {
  const currentPage = location.pathname.replace(/(html|\.|\/)/g, '');
  const linksBlock = document.querySelector('.learn-block');
  linksBlock.querySelector(`[href*='${currentPage}']`).classList.add('active');
});
