/* eslint-disable max-len */
import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';

import EmptyCV from '../EmptyCV/EmptyCV.jsx';

import { PlusButtonIcon } from '../icons/Icons.jsx';

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
        { name: 'work-company_0', title: 'Назва компанії:', value: '' },
        { name: 'work-position_0', title: 'Посада: (наприклад швачка, кухарка)', value: '' },
        { name: 'work-description_0', title: 'Опис повний: (розкажіть чим ви займалися)', value: '' },
        { name: 'work-start_0', title: 'Дата початку роботи:', value: '' },
        { name: 'work-end_0', title: 'Дата кінця роботи:', value: '' },
      ],
    ],
    education: [
      [
        { name: 'education-name_0', title: 'Назва закладу:', value: '' },
        { name: 'education-specialization_0', title: 'Спеціальність:', value: '' },
        { name: 'education-description_0', title: 'Опис повний: (розкажіть, які навички ви отримали у процесі навчання)', value: '' },
        { name: 'education-start_0', title: 'Дата вступу:', value: '' },
        { name: 'education-end_0', title: 'Дата закінчення:', value: '' },
      ],
    ],
  };
}

function deleteGroupFromState(curState, setState, index) {
  const newState = Array.from(curState);
  newState.splice((index), 1);
  setState(newState);
}
/** Меняет количество групп полей в форме */
function changeState(curState, setState) {
  const newState = _.cloneDeep(curState);
  const changedIndexArray = _.cloneDeep(newState[newState.length - 1]);
  changedIndexArray.forEach((fieldArg) => {
    const field = fieldArg;
    const currentIndex = +field.name.split('_')[1];
    field.name = field.name.replace(/_(.+)/, `_${+currentIndex + 1}`);
  });
  newState.push(changedIndexArray);
  setState(newState);
}


function InputGroupCV(props) {
  const { field, inWhatGroupIsField, groupBelongsTo } = props;
  const { index } = props;

  return (
    <Field key={index} name={field.name}>
        {({
          fieldFormik, // { name, value, onChange, onBlur }
          form: { touched, errors },
          meta,
        }) => (
        <div className={meta.error !== undefined ? 'unfilled input-group fade-in-fwd' : 'input-group fade-in-fwd'}>
            <input
                title={field.title}
                className='input-std'
                type={field.type ? field.type : 'text'}
                placeholder={field.title} {...fieldFormik} />
            {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
            )}
        </div>
        )}
    </Field>
  );
}

function PlusButton(props) {
  return (
    <>
      <PlusButtonIcon minus={props.minus} onClick={() => props.toClick() } data-tip={props.title}/>
      <ReactTooltip className="create-cv-tooltip" />
    </>
  );
}


export default function CreateCV() {
  const [defaultFields, setDefaultFields] = useState(getFieldsForCV().defaultFields);
  const [workAbilities, setWorkAbilities] = useState(getFieldsForCV().workAbilities);
  const [workExpirience, setworkExpirience] = useState(getFieldsForCV().workExpirience);
  const [education, setEducation] = useState(getFieldsForCV().education);

  const [globalFormState, setGlobalFormState] = useState(getFieldsForCV());

  return (
    <div className="create-cv-wrapper">
      <div className="page-title text-violet">
        Створити резюме
      </div>
      <EmptyCV/>
      <Formik initialValues={{}}>
        <div className="form-std">
          <div className="form-std__subtitle text-violet">
            Створити нове резюме:
          </div>
          <div className="button-std button-std--violet small">Додати фото</div>
          <span className="text-gray"> (розмір фото 150х150)</span>
          <input type="file" name="" id="" />
          {defaultFields.map(field => (
              <InputGroupCV field={field}/>
          ))
          }

          {workAbilities.map((group, index) => (
            <div className="input-section fade-in-fwd">
                <div className="input-section__title text-violet">{getFieldsForCV().groupNames.workAbilities} {index+1}</div>
                {index === 0
                  ? <PlusButton
                      toClick={ evt => changeState(workAbilities, setWorkAbilities)}
                      title="Додати навичку"/>
                  : <PlusButton
                    toClick={ evt => deleteGroupFromState(workAbilities, setWorkAbilities, index)}
                    title="Видалити навичку"
                    minus={true}
                  />
                }
                {group.map(field => <InputGroupCV groupBelongsTo={defaultFields.workAbilities} inWhatGroupIsField={workAbilities} field={field} index={index}/>)}
            </div>
          ))}
          {workExpirience.map((group, index) => (
            <div className="input-section fade-in-fwd">
                <div className="input-section__title text-violet">{getFieldsForCV().groupNames.workExpirience} {index+1}</div>
                {index === 0 
                  ? <PlusButton toClick={ (evt) => {
                    changeState(workExpirience, setworkExpirience);
                  }} title="Додати навичку"/>
                  : <PlusButton
                    toClick={ evt => deleteGroupFromState(workExpirience, setworkExpirience, index)}
                    title="Видалити навичку"
                    minus={true}
                  />
                }
                {group.map(field => <InputGroupCV field={field} index={index}/>)}
            </div>
          ))}
          {education.map((group, index) => (
            <div className="input-section fade-in-fwd">
                <div className="input-section__title text-violet">{getFieldsForCV().groupNames.education} {index+1}</div>
                {index === 0 
                  ? <PlusButton toClick={ evt => {
                    changeState(education, setEducation);
                  }} title="Додати навичку"/> 
                  : <PlusButton
                    toClick={ evt => deleteGroupFromState(education, setEducation, index)}
                    title="Видалити навичку"
                    minus={true}
                  />
                }
                {group.map(field => <InputGroupCV field={field} index={index}/>)}
            </div>
          ))}

          <button type="submit" className="button-std button-std--violet small">Створити резюме</button>
        </div>
      </Formik>
    </div>
  );
}
