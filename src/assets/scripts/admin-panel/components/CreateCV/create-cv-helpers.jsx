export default function getFieldsForCV() {
  // if (localStorage.getItem('CV') !== null) return JSON.parse(localStorage.getItem('CV'));
  return {
    groupNames: {
      workExpirience: 'Досвід роботи',
      education: 'Освіта',
      workAbilities: 'Професійні навички',
      defaultFields: '1',
    },
    defaultFields: [
      [
        { name: 'cvName', title: 'Назва шаблону:', value: '' },
        { name: 'name', title: 'Ім\'я:', value: '' },
        { name: 'surname', title: 'Прізвище:', value: '' },
      ],
    ],
    defaultFields1: [
      [
        { name: 'tel', title: 'Телефон:', value: '' },
        { name: 'email', title: 'E-mail:', value: '' },
        { name: 'adress', title: 'Адреса: (м.Київ, вул.Хрещатик 25):', value: '' },
        { name: 'self-info', title: 'Коротка інформація про себе (розкажіть хто ви)', value: '' },
      ],
    ],
    workAbilities: [

      [
        { name: 'workAbilities_0', title: 'Наприклад знання Adobe Photoshop:', value: '' },
      ],
    ],
    workExpirience: [
      [
        { name: 'work-company_0', title: 'Назва компанії:', value: '' },
        { name: 'work-position_0', title: 'Посада: (наприклад швачка, кухарка)', value: '' },
        { name: 'work-description_0', title: 'Опис повний: (розкажіть чим ви займалися)', value: '' },
        { name: 'work-start_0', title: 'Дата початку роботи:', value: '' },
        { name: 'work-end_0', title: 'Дата кінця роботи:', value: '' },
      ],
    ],
    education: [
      [
        { name: 'education-name_0', title: 'Назва закладу:', value: '123' },
        { name: 'education-specialization_0', title: 'Спеціальність:', value: '' },
        { name: 'education-description_0', title: 'Опис повний: (розкажіть, які навички ви отримали у процесі навчання)', value: '' },
        { name: 'education-start_0', title: 'Дата вступу:', value: '' },
        { name: 'education-end_0', title: 'Дата закінчення:', value: '' },
      ],
      [
        { name: 'education-name_1', title: 'Назва закладу:', value: '' },
        { name: 'education-specialization_1', title: 'Спеціальність:', value: '' },
        { name: 'education-description_1', title: 'Опис повний: (розкажіть, які навички ви отримали у процесі навчання)', value: '' },
        { name: 'education-start_1', title: 'Дата вступу:', value: '' },
        { name: 'education-end_1', title: 'Дата закінчення:', value: '' },
      ],
    ],
  };
}
