/* eslint-disable max-len */
import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';

import EmptyCV from '../EmptyCV/EmptyCV.jsx';

import { PlusButtonIcon, NoImageIcon } from '../icons/Icons.jsx';

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
  const { field: fieldFromProps, inWhatGroupIsField, groupBelongsTo } = props;
  const { index } = props;
  return (
    <Field key={props.key} name={fieldFromProps.name} {...props}>
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors },
          meta,
        }) => (
            <div className={meta.error !== undefined ? 'unfilled input-group fade-in-fwd' : 'input-group fade-in-fwd'}>
                <input
                    title={fieldFromProps.title}
                    name={fieldFromProps.name}
                    className='input-std'
                    type={fieldFromProps.type ? fieldFromProps.type : 'text'}
                    placeholder={fieldFromProps.title} {...field} />
                {meta.touched && meta.error && (
                <div className="error">{meta.error}</div>
                )}
            </div>
        )
        }
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

function CreateFieldsSection(props) {
  const {
    groupsArrayName,
    globalState,
    setGlobalState,
    globalObject,
  } = props;
  return (
    globalState.map((group, index) => (
      <div className="input-section fade-in-fwd">
          <div className="input-section__title text-violet">{groupsArrayName} {index + 1}</div>
          {index === 0
            ? <PlusButton
                toClick={ evt => changeState(globalState, setGlobalState)}
                title="Додати навичку"/>
            : <PlusButton
              toClick={ evt => deleteGroupFromState(globalState, setGlobalState, index)}
              title="Видалити навичку"
              minus={true}
            />
          }
          {group.map(field => <InputGroupCV groupBelongsTo={globalObject.defaultFields.globalState} inWhatGroupIsField={globalState} field={field} index={index}/>)}
      </div>
    ))
  );
}



export default function CreateCV() {
  const [defaultFields, setDefaultFields] = useState(getFieldsForCV().defaultFields);
  const [workAbilities, setWorkAbilities] = useState(getFieldsForCV().workAbilities);
  const [workExpirience, setworkExpirience] = useState(getFieldsForCV().workExpirience);
  const [education, setEducation] = useState(getFieldsForCV().education);

  const [globalFormState, setGlobalFormState] = useState(getFieldsForCV());

  const [profileImg, setProfileImg] = useState('');



function findObjectByValueRecursively(objectArg, keyArg, value, transferedValue = {}) {
  // let finalValue = transferedValue;
  // Object.values(objectArg).forEach(innerValue=>{
  //   console.log(typeof innerValue.find === 'undefined');
  //   if (typeof innerValue.find !== 'undefined') {
  //     innerValue.find(input=>{
  //       if (input[keyArg] === value) {
  //         finalValue = input;
  //         console.log('succes');
  //         return finalValue;
  //       } else {
  //         return false;
  //       }
  //     })
  //   } else if (typeof innerValue.find === 'undefined' && !innerValue.hasOwnProperty('constructor')) {
  //     findObjectByValueRecursively(innerValue, keyArg, value, finalValue);
  //   } else {
  //     return;
  //   }
  // });

  // return finalValue;
}

  function handlePhotoInput(evt) {
    // const format = evt.target.value.split('.').pop();
    try {
      const url = URL.createObjectURL(evt.currentTarget.files[0]);
      setProfileImg(url);
    } catch {
      setProfileImg('');
    }
    console.log(evt.currentTarget.files[0]);
  }
  function handleSubmit(values, form) {
    console.log(values);
  }
  return (
    <div className="create-cv-wrapper">
      <button onClick={() => { findObjectByValueRecursively(globalFormState, 'name', 'workAbilities_0'); }}>Пошук</button>
      <div className="page-title text-violet">
        Створити резюме
      </div>
      <EmptyCV/>
      <Formik initialValues={{}} onSubmit={handleSubmit} validator={() => ({})}>
      {({ setFieldValue, handleChange, handleBlur, values, errors }) => (
        <Form className="form-std">
          <div className="form-std__subtitle text-violet">
            Створити нове резюме:
          </div>
          {defaultFields.map((field, index) => {
            if (index === 2) {
              return (
                <>
                  <InputGroupCV onSubmit={handleSubmit} field={field} key={field.name + index}/>
                  <div className="input-file-wrapper">
                    {profileImg === '' ? <NoImageIcon/> : <img className="cv-form-img border-10" alt="" src={profileImg} />}
                    <label for="cv-photo" className="button-std button-std--violet small mt-0">
                      Додати фото
                    </label>
                    <span className="file-input-text"> (розмір фото 150х150)</span>
                    <input
                      onInput={handlePhotoInput}
                      onChange={(event) => {
                        setFieldValue('my-file', event.currentTarget.files[0]);
                      }} 
                      type="file"
                      name="my-file"
                      id="cv-photo"
                      accept="image/gif, image/png, image/jpeg" />
                  </div>
                </>
              );
            }
            return <InputGroupCV field={field} key={field.name + index}/>;
          })
          }
          <CreateFieldsSection
            globalObject={getFieldsForCV()}
            setGlobalState={setWorkAbilities}
            groupsArrayName={getFieldsForCV().groupNames.workAbilities}
            globalState={workAbilities}
          />
          <CreateFieldsSection
            globalObject={getFieldsForCV()}
            setGlobalState={setworkExpirience}
            groupsArrayName={getFieldsForCV().groupNames.workExpirience}
            globalState={workExpirience}
          />
          <CreateFieldsSection
            globalObject={getFieldsForCV()}
            setGlobalState={setEducation}
            groupsArrayName={getFieldsForCV().groupNames.education}
            globalState={education}
          />
          <button type="submit" className="button-std button-std--violet small">Створити резюме</button>
        </Form>
      )}
      </Formik>
    </div>
  );
}
