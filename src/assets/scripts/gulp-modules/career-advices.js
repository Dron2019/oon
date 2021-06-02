const searchAdvForm = document.querySelector('[name="search-advices"]');
searchAdvForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(searchAdvForm);
  console.log(formData.get('search'));
});
searchAdvForm.querySelector('input').addEventListener('input', (evt) => {
});
