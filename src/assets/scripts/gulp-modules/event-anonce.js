const anonceNav = document.querySelector('[data-anonce-filter]');
anonceNav.querySelectorAll('button').forEach(el=> {
  el.addEventListener('click', function(evt) {
    anonceNav.querySelectorAll('button').forEach(nav=> nav.classList.remove('active'));
    this.classList.add('active');
  });
})