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
        {
          name: 'cvName', title: 'Назва шаблону:', value: '', pdf_title: 'Назва резюме:',
        },
        {
          name: 'name', title: 'Ім\'я:', value: '', pdf_title: 'Ім\'я:',
        },
        {
          name: 'surname', title: 'Прізвище:', value: '', pdf_title: 'Прізвище:',
        },
        {
          name: 'fathername', title: 'По-батькові:', value: '', pdf_title: 'По-батькові:',
        },
      ],
    ],
    defaultFields1: [
      [
        {
          name: 'tel', title: 'Телефон:', value: '', pdf_title: 'Телефон:',
        },
        {
          name: 'email', title: 'E-mail:', value: '', pdf_title: 'E-mail:',
        },
        {
          name: 'adress', title: 'Адреса: (м.Київ, вул.Хрещатик 25):', value: '', pdf_title: 'Адреса:',
        },
        {
          name: 'self-info', title: 'Коротка інформація про себе (розкажіть хто ви)', value: '', pdf_title: 'Коротка інформація про себе',
        },
      ],
    ],
    workAbilities: [

      [
        {
          name: 'workAbilities_0', title: 'Наприклад знання Adobe Photoshop:', value: '', pdf_title: 'Навичка:',
        },
      ],
    ],
    workExpirience: [
      [
        {
          name: 'work-company_0', title: 'Назва компанії:', value: '', pdf_title: 'Назва компанії:',
        },
        {
          name: 'work-position_0', title: 'Посада: (наприклад швачка, кухарка)', value: '', pdf_title: 'Посада:',
        },
        {
          name: 'work-description_0', title: 'Опис повний: (розкажіть чим ви займалися)', value: '', pdf_title: 'Опис повний:',
        },
        {
          name: 'work-start_0', title: 'Дата початку роботи:', value: '', pdf_title: 'Дата початку роботи:',
        },
        {
          name: 'work-end_0', title: 'Дата кінця роботи:', value: '', pdf_title: 'Дата кінця роботи:',
        },
      ],
    ],
    education: [
      [
        {
          name: 'education-name_0', title: 'Назва закладу:', value: '123', pdf_title: 'Назва закладу:',
        },
        {
          name: 'education-specialization_0', title: 'Спеціальність:', value: '', pdf_title: 'Спеціальність:',
        },
        {
          name: 'education-description_0', title: 'Опис повний: (розкажіть, які навички ви отримали у процесі навчання)', value: '', pdf_title: 'Опис повний:',
        },
        {
          name: 'education-start_0', title: 'Дата вступу:', value: '', pdf_title: 'Дата вступу:',
        },
        {
          name: 'education-end_0', title: 'Дата закінчення:', value: '', pdf_title: 'Дата закінчення:',
        },
      ],
      [
        {
          name: 'education-name_1', title: 'Назва закладу:', value: '', pdf_title: 'Назва закладу:',
        },
        {
          name: 'education-specialization_1', title: 'Спеціальність:', value: '', pdf_title: 'Спеціальність:',
        },
        {
          name: 'education-description_1', title: 'Опис повний: (розкажіть, які навички ви отримали у процесі навчання)', value: '', pdf_title: 'Опис повний:',
        },
        {
          name: 'education-start_1', title: 'Дата вступу:', value: '', pdf_title: 'Дата вступу:',
        },
        {
          name: 'education-end_1', title: 'Дата закінчення:', value: '', pdf_title: 'Дата закінчення:',
        },
      ],
    ],
  };
}
