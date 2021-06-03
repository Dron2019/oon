/* eslint-disable max-len */
import React, {useState} from 'react';

import EmptyCV from '../EmptyCV/EmptyCV.jsx';

function getFieldsForCV() {
  return {
    groupNames: {
      workExpirience: 'Досвід роботи',
      education: 'Освіта',
      workAbilities: 'Професійні навички',
    },
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

      [
        { name: 'workAbilities_0', title: 'Наприклад знання Adobe Photoshop:', value: '' },
      ],
    ],
    workExpirience: [
      [
        { name: 'work-company', title: 'Назва компанії:', value: '' },
        { name: 'work-position', title: 'Посада: (наприклад швачка, кухарка)', value: '' },
        { name: 'work-description', title: 'Опис повний: (розкажіть чим ви займалися)', value: '' },
        { name: 'work-start', title: 'Дата початку роботи:', value: '' },
        { name: 'work-end', title: 'Дата кінця роботи:', value: '' },
      ],
    ],
    education: [
      [
        { name: 'education-name', title: 'Назва закладу:', value: '' },
        { name: 'education-specialization', title: 'Спеціальність:', value: '' },
        { name: 'education-description', title: 'Опис повний: (розкажіть, які навички ви отримали у процесі навчання)', value: '' },
        { name: 'education-start', title: 'Дата вступу:', value: '' },
        { name: 'education-end', title: 'Дата закінчення:', value: '' },
      ],
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
  let [ defaultFields, setDefaultFields] = useState(getFieldsForCV().defaultFields);
  let [ workAbilities, setWorkAbilities] = useState(getFieldsForCV().workAbilities);
  let [ workExpirience, setworkExpirience] = useState(getFieldsForCV().workExpirience);
  let [ education, setEducation] = useState(getFieldsForCV().education);

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
        <div className="button-std button-std--violet small">Додати фото</div>
        <span className="text-gray"> (розмір фото 150х150)</span>
        <input type="file" name="" id="" />
        {defaultFields.map(field => (
            <div className="input-group">
              <input type="text" className="input-std" value={field.value} placeholder={field.title} />
            </div>
        ))
        }
        <div className="input-section">
          <div className="input-section__title text-violet">{getFieldsForCV().groupNames.workAbilities}</div>
          {workAbilities.map(group => group.map((field, index) => <InputGroupCV field={field} index={index}/>))}
        </div>
        <div className="input-section">
          <div className="input-section__title text-violet">{getFieldsForCV().groupNames.workExpirience}</div>
          {workExpirience.map(group => group.map((field, index) => <InputGroupCV field={field} index={index}/>))}
        </div>
        <div className="input-section">
          <div className="input-section__title text-violet">{getFieldsForCV().groupNames.education}</div>
            {education.map(group => group.map((field, index) => <InputGroupCV field={field} index={index}/>))}
        </div>
        <button type="submit" className="button-std button-std--violet small">Створити резюме</button>
      </div>
    </div>
  );
}

function InputGroupCV(props) {
  const { field } = props;
  const { index } = props;
  return (
    <div className="input-group">
      <input type="text" key={index} className="input-std" value={field.value} placeholder={field.title} />
    </div>
  );
}