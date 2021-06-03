import React, {useState} from 'react';

import EmptyCV from '../EmptyCV/EmptyCV.jsx';

function getFieldsForCV() {
  return {
    defaultFields: [
      { name: 'cvName', title: 'Назва шаблону:', value: '' },
      { name: 'name', title: 'Ім\'я:', value: '' },
      { name: 'surname', title: 'Прізвище:', value: '' },
      { name: 'tel', title: 'Телефон:', value: '' },
      { name: 'email', title: 'E-mail:', value: '' },
      { name: 'adress', title: 'Адреса: (м.Київ, вул.Хрещатик 25):', value: '' },
      { name: 'self-info', title: 'Коротка інформація про себе (розкажіть хто ви)', value: '' },
    ],
    workAbilities: [
      'Професійні навички',
      { name: 'workAbilities_0', title: 'Наприклад знання Adobe Photoshop:', value: '' },
    ],
    workExpirience: [
      'Місце роботи',
      [
        { name: 'work-company', title: 'Назва компанії:', value: '' },
        { name: 'work-position', title: 'Посада: (наприклад швачка, кухарка)', value: '' },
        { name: 'work-description', title: 'Опис повний: (розкажіть чим ви займалися)', value: '' },
        { name: 'work-start', title: 'Дата початку роботи:', value: '' },
        { name: 'work-end', title: 'Дата кінця роботи:', value: '' },
      ],
    ],
    education: [
      'Освіта',
      [
        { name: 'education-name', title: 'Назва закладу:', value: '' },
        { name: 'education-specialization', title: 'Спеціальність:', value: '' },
        { name: 'education-description', title: 'Опис повний: (розкажіть, які навички ви отримали у процесі навчання)', value: '' },
        { name: 'education-start', title: 'Дата вступу:', value: '' },
        { name: 'education-end', title: 'Дата закінчення:', value: '' },
      ],
    ],
  };
}


export default function CreateCV() {
  let [defaultFields, setDefaultFields] = useState(getFieldsForCV().defaultFields);
  let [ workAbilities, setWorkAbilities] = useState(getFieldsForCV().workAbilities[1]);
  let [ workExpirience, setworkExpirience] = useState(getFieldsForCV().workExpirience[1]);
  let [ education, setEducation] = useState(getFieldsForCV().education[1]);
  console.log(defaultFields);
  return (
    <div className="create-cv-wrapper">
      <div className="page-title text-violet">
        Створити резюме
      </div>
      <EmptyCV/>
      <div className="form-std">
        <div className="form-std__subtitle text-violet">
          Створити нове резюме:
        </div>
        {defaultFields.map(field => (
            <div className="input-group">
              <input type="text" className="input-std" value={field.value} placeholder={field.title} />
            </div>
        ))
        }
        <div className="input-section">
          <div className="input-section__title"></div>
        </div>
        {workAbilities.map(field => (
            <div className="input-group">
              <input type="text" className="input-std" value={field.value} placeholder={field.title} />
            </div>
        ))}
      </div>
    </div>
  );
}

