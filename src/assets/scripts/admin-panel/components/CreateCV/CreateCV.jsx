/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import _, { concat, isArray } from 'lodash';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import EmptyCV from '../EmptyCV/EmptyCV.jsx';
import { PlusButtonIcon, NoImageIcon } from '../icons/Icons.jsx';
import { getCV, sendCV } from '../../stores/CVStore/cv-actions.jsx';
import dataStore from '../../stores/userDataStore/index.jsx';
import ErrorMessage from '../error-message/ErrorMessage.jsx';
import SingleCV from '../UserCV/SingleCV.jsx';
import routes from '../../routes/routes.jsx';

function getFieldsForCV() {
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
  const {
    field: fieldFromProps, inWhatGroupIsField, groupBelongsTo, index,
  } = props;
  return (
    <Field key={index} name={fieldFromProps.name} {...props}>
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
      <div key={`${groupsArrayName}${index}`} className="input-section fade-in-fwd" key={index}>
          <div className="input-section__title text-violet">{groupsArrayName} {index + 1}</div>
          {index === 0
            ? <PlusButton
                toClick={ evt => changeState(globalState, setGlobalState)}
                title="Додати навичку"/>
            : <div className="double-plus-buttons">
              <PlusButton
                  toClick={ evt => changeState(globalState, setGlobalState)}
                  title="Додати навичку"/>
              <PlusButton
                toClick={ evt => deleteGroupFromState(globalState, setGlobalState, index)}
                title="Видалити навичку"
                minus={true}
              />
            </div>
          }
          {group.map((field, i) => <InputGroupCV key={`${field.name}${index}`} groupBelongsTo={globalObject.defaultFields.globalState} inWhatGroupIsField={globalState} field={field} index={i}/>)}
      </div>
    ))
  );
}

function CreateFieldsSectionofDefaultFields(props) {
  const {
    groupsArrayName,
    globalState,
    setGlobalState,
    globalObject,
  } = props;
  return (
    globalState.map((group, index) => (
      <>
          {group.map((field, i) => <InputGroupCV key={i.toString() + groupsArrayName} groupBelongsTo={globalObject.defaultFields.globalState} inWhatGroupIsField={globalState} field={field} index={index}/>)}
      </>
    ))
  );
}


export default function CreateCV() {
  const [groupNames, setDefaultNames] = useState(getFieldsForCV().groupNames);
  const [defaultFields, setDefaultFields] = useState(getFieldsForCV().defaultFields);
  const [defaultFields1, setDefaultFields1] = useState(getFieldsForCV().defaultFields1);
  const [workAbilities, setWorkAbilities] = useState(getFieldsForCV().workAbilities);
  const [workExpirience, setworkExpirience] = useState(getFieldsForCV().workExpirience);
  const [education, setEducation] = useState(getFieldsForCV().education);
  const [profileImg, setProfileImg] = useState('');
  const [imgBlob, setImgBlob] = useState('');
  const errorMessage = useSelector(store => store.loginStatusReducer.error);
  const [globalFormState, setGlobalFormState] = useState({
    groupNames,
    defaultFields,
    defaultFields1,
    workAbilities,
    workExpirience,
    education,
  });

  const CVs = useSelector(state => state.cvReducer);

  useEffect(() => {
    // localStorage.setItem('CV', JSON.stringify(globalFormState));
  }, [globalFormState]);

  useEffect(() => {
    dataStore.dispatch(getCV());
  }, []);

  function setGlobalStateAndAddItToStorage() {
    setGlobalFormState({
      groupNames,
      defaultFields,
      defaultFields1,
      workAbilities,
      workExpirience,
      education,
    });
  }


  function createValidationSchema() {
    const requiredFieldsName = ['name', 'cvName', 'surname', 'tel'];
    const schemaParams = {

    };
    requiredFieldsName.forEach((fieldName) => {
      schemaParams[fieldName] = Yup.string().required('Введіть дані').min(2, 'Введіть дані');
    });

    console.log(schemaParams);
    return Yup.object().shape(schemaParams);
  }
  function handlePhotoInput(evt) {
    try {
      const url = URL.createObjectURL(evt.currentTarget.files[0]);
      setProfileImg(url);
      setImgBlob(evt.currentTarget.files[0]);
    } catch {
      setProfileImg('');
      setImgBlob('');
    }
  }
  function handleSubmit(values, form) {
    console.log(values);
    // localStorage.setItem('cv-init-fields', JSON.stringify(values));
    setGlobalStateAndAddItToStorage();


    const cvData = {};
    cvData.image = imgBlob;
    const jsonData = {
      initialValues: values,
      structure: globalFormState,
    };
    cvData.jsonData = jsonData;
    dataStore.dispatch(sendCV(cvData));
  }
  return (
    <div className="create-cv-wrapper">
      <button onClick={() => { dataStore.dispatch(getCV()); }}>some</button>
      <div className="page-title text-violet">
        Створити резюме
      </div>
      {CVs.length === 0 ? <EmptyCV/> :
        <div className="white-bg-element create-cv-list">
        {
          CVs.map((singleCV) => (
          <SingleCV noLinks={true} item={singleCV}/>
          ))
        }
        <Link className='button-std button-std--violet small' to={routes.userCV}>Перейти до резюме</Link>
        </div>
      }

      <Formik validationSchema={createValidationSchema()} initialValues={{}} onSubmit={handleSubmit} validator={() => ({})}>
      {({
        setFieldValue, handleChange, handleBlur, values, errors,
      }) => (
        <Form className="form-std">
          <div className="form-std__subtitle text-violet">
            Створити нове резюме:
          </div>
          <CreateFieldsSectionofDefaultFields
            globalObject={getFieldsForCV()}
            setGlobalState={setDefaultFields}
            groupsArrayName={getFieldsForCV().groupNames.defaultFields}
            globalState={defaultFields}
          />
          <div className="input-file-wrapper">
            {profileImg === '' ? <NoImageIcon/> : <img className="cv-form-img border-10" alt="" src={profileImg} />}
            <label htmlFor="cv-photo" className="button-std button-std--violet small mt-0">
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
          <CreateFieldsSectionofDefaultFields
            globalObject={getFieldsForCV()}
            setGlobalState={setDefaultFields1}
            groupsArrayName={getFieldsForCV().groupNames.defaultFields1}
            globalState={defaultFields1}
          />
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
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <button type="submit" className="button-std button-std--violet small">Створити резюме</button>
        </Form>
      )}
      </Formik>
    </div>
  );
}
