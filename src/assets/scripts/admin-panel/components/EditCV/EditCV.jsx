import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import _, { concat, isArray } from 'lodash';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { PlusButtonIcon, NoImageIcon } from '../icons/Icons.jsx';
import { sendEditedCV } from '../../stores/CVStore/cv-actions.jsx';
import dataStore from '../../stores/userDataStore/index.jsx';
import ErrorMessage from '../error-message/ErrorMessage.jsx';
import SingleCV from '../UserCV/SingleCV.jsx';
import routes from '../../routes/routes.jsx';


function deleteGroupFromState(curState, setState, index) {
  const newState = Array.from(curState);
  newState.splice((index), 1);
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
                {!meta.error && meta.value && meta.touched && (
                <div className="error placeholder-in-focus">{fieldFromProps.title}</div>
                )}
            </div>
        )
        }
    </Field>
  );
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
          {group.map((field, i) => (
            <InputGroupCV
            key={i.toString() + groupsArrayName}
            groupBelongsTo={globalObject.defaultFields.globalState}
            inWhatGroupIsField={globalState}
            field={field} index={index}/>
          ))}
      </>
    ))
  );
}


export default function EditCV(props) {
  const CVs = useSelector(state => state.cvReducer);
  const ID = useSelector(state => state.cvToEditStore);
  const cvToEdit = useSelector(state => state.cvReducer.find(el => (
    el.id === ID
  )));
  const [profileImg, setProfileImg] = useState(cvToEdit.img);
  const [imgBlob, setImgBlob] = useState('');
  const errorMessage = useSelector(store => store.loginStatusReducer.error);

  const cvData = JSON.parse(cvToEdit.cvs);
  const { initialValues, structure } = cvData;
  const [groupNames, setDefaultNames] = useState(structure.groupNames);
  const [defaultFields, setDefaultFields] = useState(structure.defaultFields);
  const [defaultFields1, setDefaultFields1] = useState(structure.defaultFields1);
  const [workAbilities, setWorkAbilities] = useState(structure.workAbilities);
  const [workExpirience, setworkExpirience] = useState(structure.workExpirience);
  const [education, setEducation] = useState(structure.education);
  const [globalFormState, setGlobalFormState] = useState({
    groupNames,
    defaultFields,
    defaultFields1,
    workAbilities,
    workExpirience,
    education,
  });
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
  useEffect(() => {
    setProfileImg(cvToEdit.img);
  }, [cvToEdit]);

  // console.log(profileImg);
  useEffect(() => {
    // localStorage.setItem('CV', JSON.stringify(globalFormState));
  }, [globalFormState]);
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
    setGlobalStateAndAddItToStorage();
    const cvDataToSend = {};
    cvDataToSend.image = imgBlob;
    const jsonData = {
      initialValues: values,
      structure: globalFormState,
    };
    cvDataToSend.jsonData = jsonData;
    dataStore.dispatch(sendEditedCV(cvDataToSend));
  }
  return (
    <div className="edit-cv-wrapper">
      <div className="page-title text-violet">Редагувати резюме</div>
      <Formik onSubmit={handleSubmit} enableReinitialize={true} initialValues={initialValues}>
        <Form className="form-std">
        <CreateFieldsSectionofDefaultFields
              globalObject={structure}
              setGlobalState={setDefaultFields}
              groupsArrayName={structure.groupNames.defaultFields}
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
                // setFieldValue('my-file', event.currentTarget.files[0]);
              }}
              type="file"
              name="my-file"
              id="cv-photo"
              accept="image/gif, image/png, image/jpeg" />
          </div>
        <CreateFieldsSectionofDefaultFields
              globalObject={structure}
              setGlobalState={setDefaultFields1}
              groupsArrayName={structure.groupNames.defaultFields1}
              globalState={defaultFields1}
            />
        <CreateFieldsSection
            globalObject={structure}
            setGlobalState={setWorkAbilities}
            groupsArrayName={structure.groupNames.workAbilities}
            globalState={workAbilities}
          />
          <CreateFieldsSection
            globalObject={structure}
            setGlobalState={setworkExpirience}
            groupsArrayName={structure.groupNames.workExpirience}
            globalState={workExpirience}
          />
          <CreateFieldsSection
            globalObject={structure}
            setGlobalState={setEducation}
            groupsArrayName={structure.groupNames.education}
            globalState={education}
          />
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <button type="submit" className="button-std button-std--violet small">Редагувати резюме</button>
        </Form>
      </Formik>
    </div>
  );
}
