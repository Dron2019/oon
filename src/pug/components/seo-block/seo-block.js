

export default function handleSeoBlock(block) {
  const readMoreButton = block.querySelector('[data-seo-read-more]');
  const seoBlock = block;
  readMoreButton.addEventListener('click', () => {
    seoBlock.classList.toggle('opened');
    if (seoBlock.classList.contains('opened')) {
      readMoreButton.querySelector('.main-button__text').innerText = readMoreButton.dataset.textWhenOpened;
    } else {
      readMoreButton.querySelector('.main-button__text').innerText = readMoreButton.dataset.textWhenClosed;
    }
    if (window.locoScroll !== undefined) window.locoScroll.update();
  });
}
