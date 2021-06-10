/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
const routes = [
  {
    name: 'home',
    path: '/',
    title: '',
  },
  {
    name: 'cabinet',
    path: '/cabinet',
    title: '',
  },
  {
    name: 'forgotPassword',
    path: '/forgot-password',
    title: 'Забули пароль?',
  },
  {
    name: 'register',
    path: '/register',
    title: 'Зареєструватися',
  },
  {
    name: 'login',
    path: '/login',
    title: 'Вхід',
  },
];
const cabinetRoutes = [
  { name: 'cabinet', path: '/cabinet', title: 'Кабінет' },
  { name: 'createQuestion', path: '/cabinet/createQuestion', title: 'Вхід' },
  { name: 'questionsHistory', path: '/cabinet/questionsHistory', title: 'Вхід' },
  { name: 'onlineConsultRequest', path: '/cabinet/consult-request', title: 'Вхід' },
  { name: 'appliedConsultRequest', path: '/cabinet', title: 'Вхід' },
  { name: 'jobSearchConsult', path: '/cabinet', title: 'Вхід' },


  { name: 'userCV', path: '/cabinet/user-cv', title: 'Мої резюме' },
  { name: 'FAQ', path: '/cabinet/faq', title: 'Часті запитання' },
  { name: 'CreateCV', path: '/cabinet/create-cv', title: 'Створити резюме' },
  { name: 'profileEditor', path: '/cabinet/profileEditor', title: 'Редагувати профіль' },
  { name: 'onlineConsultationRequest', path: '/cabinet/onlineConsultationRequest', title: 'Запит на онлайн консультацію' },
  { name: 'createConsultQuestion', path: '/cabinet/createConsultQuestion', title: 'Створити запитання' },
  { name: 'workConsultation', path: '/cabinet/work-consultation', title: 'Послуги консультанта з пошуку роботи' },
  { name: 'psychoQuestionCreate', path: '/cabinet/psychoQuestionCreate', title: 'Поставити запитання психологу' },
];
const routesMap = {};
const routesMapSidebar = [];
cabinetRoutes.forEach((route) => {
  if (route.hasOwnProperty('name')) {
    routesMap[route.name] = route.path;
  }
});
routes.forEach((route) => {
  if (route.hasOwnProperty('name')) {
    routesMap[route.name] = route.path;
  }
});


for (const key in routesMap) {
  if (key === 'home' || key === 'order' || key === 'cart') {
    routesMapSidebar.push({
      name: key,
      url: routesMap[key],
    });
  }
}
export default (function map() {
  return routesMap;
}());
