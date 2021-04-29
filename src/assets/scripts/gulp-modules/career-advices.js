const searchAdvForm = document.querySelector('[name="search-advices"]');
searchAdvForm.addEventListener('submit',function(evt){
    evt.preventDefault();
    var formData = new FormData(searchAdvForm);
    console.log(formData.get('search'));
});
searchAdvForm.querySelector('input').addEventListener('input',function(evt){
});