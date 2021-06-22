const anonceNav = document.querySelector('[data-anonce-filter]');
const eventItems = document.querySelectorAll('[data-event-item]');
const date = new Date().getTime();
const datasetToFilter = 'eventTime';

const buttons = {
  anonceFuture: () => {
    eventItems.forEach((elArg) => {
      const el = elArg;
      const eventDate = new Date(el.dataset[datasetToFilter]).getTime();
      console.log(date < eventDate);
      if (date < eventDate) {
        el.style.display = 'flex';
      } else {
        el.style.display = 'none';
      }
    });
  },
  anoncePast: () => {
    eventItems.forEach((elArg) => {
      const el = elArg;
      const eventDate = new Date(el.dataset[datasetToFilter]).getTime();
      if (date > eventDate) {
        el.style.display = 'flex';
      } else {
        el.style.display = 'none';
      }
    });
  },
};
anonceNav.querySelectorAll('button').forEach((el) => {
  const firstDataset = Object.keys(el.dataset)[0];
  el.addEventListener('click', function handleAnonceBlockVisibility(evt) {
    anonceNav.querySelectorAll('button').forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
    buttons[firstDataset]();
  });
});
