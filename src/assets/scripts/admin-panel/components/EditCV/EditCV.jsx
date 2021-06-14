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
import { getCV, sendCV } from '../../stores/CVStore/cv-actions.jsx';
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


export default function EditCV(props) {
  const CVs = useSelector(state => state.cvReducer);
  const ID = useSelector(state => state.cvToEditStore);
  const cvToEdit = useSelector(state => state.cvReducer.find(el => (
    el.id === ID
  )));
  const [profileImg, setProfileImg] = useState('');
  const [imgBlob, setImgBlob] = useState('');
  const errorMessage = useSelector(store => store.loginStatusReducer.error);
  const [globalFormState, setGlobalFormState] = useState({
    // groupNames,
    // defaultFields,
    // defaultFields1,
    // workAbilities,
    // workExpirience,
    // education,
  });
  useEffect(() => {
    // localStorage.setItem('CV', JSON.stringify(globalFormState));
  }, [globalFormState]);
  const cvData = JSON.parse(cvToEdit.cvs);
  console.log(cvData);
  // const [groupNames, setDefaultNames] = useState(getFieldsForCV().groupNames);
  // const [defaultFields, setDefaultFields] = useState(getFieldsForCV().defaultFields);
  // const [defaultFields1, setDefaultFields1] = useState(getFieldsForCV().defaultFields1);
  // const [workAbilities, setWorkAbilities] = useState(getFieldsForCV().workAbilities);
  // const [workExpirience, setworkExpirience] = useState(getFieldsForCV().workExpirience);
  // const [education, setEducation] = useState(getFieldsForCV().education);

  return (
    <>
      <div className="page-title text-violet">Редагувати резюме</div>
    </>
  );
}
