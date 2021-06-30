/* eslint-disable camelcase */
/* eslint-disable no-multi-assign */
import React, {
  useMemo, useState, useEffect, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

import ProfileEditorCounter from '../ProfileEditorCounter/index.jsx';
import Loader from '../loader/loader.jsx';
import ErrorMessage from '../error-message/ErrorMessage.jsx';
import dataStore from '../../stores/userDataStore/index.jsx';
import { ajax_getProfileData, getProfileData, ajax_setProfileData } from '../../stores/profileInfoStore/actions_profileInfoStore.jsx';
import { changePasswordRequest } from '../../stores/userDataStore/actions.jsx';
import { telephoneMask } from '../../helpers.jsx';

export default function ProfileEditor(props) {
  dataStore.dispatch(getProfileData());
  const firstRender = useMemo(
    () => dataStore.dispatch(ajax_getProfileData()),
    [],
  );

  const [initialSubmitBlock, setInitialSubmitBlock] = useState(true);
  const profileEditorFields = useSelector(state => state.profileInfoReducers);
  const errorMessage = useSelector(state => state.loginStatusReducer.error);
  const messageColors = ['green', 'orange'];
  const formMessageColor = useSelector(state => state.messageStatusStore);
  // const errorMessage = 'Ваша сессия истекла, зайдите заново';
  const isPending = useSelector(state => state.pendingStatusStore);
  const initialValues = {};
  profileEditorFields.forEach((field) => {
    if (field.initialValue
      || field.value) initialValues[field.name] = field.initialValue || field.value;
    if (field.type === 'select') initialValues[field.name] = field.value;
  });
  const disabledFields = {
    email: true,
    email_r: true,
  };


  const SignupSchema = Yup.object().shape(
    {
      surname_r: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      name_r: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      // email_r: Yup.string().email('Invalid email').required('Required'),
    },
  );
  const passwordSchema = Yup.object().shape({
    old_pass: Yup.string().required('Введіть старий пароль').min(2, 'Введіть старий пароль'),
    password: Yup.string().required('Введіть новий пароль'),
    changepassword: Yup.string().required('Повторіть новий пароль').when('password', {
      is: val => (!!(val && val.length > 0)),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Повторний пароль не вірний',
      ),
    }),
  });
  // const [countedFields, setCountedFields] = useState(countFilledFields(profileEditorFields));

  const [circleCords, setCircleCords] = useState('');
  const [borderCords, setBorderCords] = useState('');
  const [borderCordsInnerBorder, setBorderCordsInnerBorder] = useState('');
  useEffect(() => {
  }, [profileEditorFields]);

  return (
        <div className="profile-editor-wrapper">
            <div className="page-title text-violet uppercased">Редагувати профіль</div>
            <ProfileEditorCounter profileEditorFields={profileEditorFields}/>
            <div className="white-bg-element profile-editor-wrapper__right">
            <Formik
                enableReinitialize
                validationSchema={SignupSchema}
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);
                  dataStore.dispatch(ajax_setProfileData(values));
                  setInitialSubmitBlock(true);
                }}>
                <Form
                  className="form-std"
                  onChange={() => {
                    // eslint-disable-next-line no-unused-expressions
                    initialSubmitBlock ? setInitialSubmitBlock(false) : null;
                  }}
                >
                    <div className="form-std__subtitle text-violet">Ваші особисті дані</div>
                    {profileEditorFields.map((field_config, index) => {
                      if (field_config.type === 'select') {
                        return (
                            <div key={`${index}aa`} className="input-group input-group-select">
                            <div className="error placeholder-in-focus">{field_config.selects[0]}</div>
                            <Field key={`${index}bb`} name={field_config.name} className="fw-500 text-black" as={field_config.type}>
                                {field_config.selects.map((option, i) => (
                                    <option key={option[0]} value={i}>{option}</option>
                                ))}
                                </Field>
                            </div>
                        );
                      }
                      return (
                          <Field key={index} name={field_config.name}>
                            {({
                              field, // { name, value, onChange, onBlur }
                              form: { touched, errors },
                              meta,
                            }) => (
                            <div className={meta.error !== undefined ? 'unfilled input-group' : 'input-group'}>
                                {(field_config.name !== 'tel' && field_config.name !== 'mainPhone') ? <input
                                    title={field_config.title}
                                    disabled = {disabledFields[field_config.name] === true}
                                    className='input-std'
                                    type={field_config.type ? field_config.type : 'text'}
                                    placeholder={field_config.title || ''} {...field} />
                                  : <InputMask className="input-std" placeholder={field_config.title || ''} {...field} mask={telephoneMask} type={field_config.type ? field_config.type : 'text'} name={field_config.name}></InputMask>
                                  }
                                {field_config.title && <div className="error placeholder-in-focus">{field_config.title}</div>}
                                {meta.touched && meta.error && (
                                <div className="error">{meta.error}</div>
                                )}
                            </div>
                            )}
                          </Field>
                      );
                    })}
                    {/* {profileEditorFields.map((field_config, index) => (
                            <Field key={index} name={field_config.name}>
                            {({
                              field, // { name, value, onChange, onBlur }
                              form: { touched, errors },
                              meta,
                            }) => (
                            <div className={meta.error !== undefined ?
                              'unfilled input-group' : 'input-group'}>
                              {(field_config.name !== 'tel' && field_config.name !== 'mainPhone') ?
                                <input
                                    title={field_config.title}
                                    disabled = {disabledFields[field_config.name] === true}
                                    className='input-std'
                                    type={field_config.type ? field_config.type : 'text'}
                                    placeholder={field_config.title || ''} {...field} />
                              : <InputMask className="input-std"
                              placeholder={field_config.title || ''}
                              {...field} mask={telephoneMask}
                              type={field_config.type ? field_config.type : 'text'}
                                  name={field_config.name}></InputMask>
                                  }
                                {meta.touched && meta.error && (
                                <div className="error">{meta.error}</div>
                                )}
                            </div>
                            )}
                        </Field>
                    ))} */}
                    {/* {errorMessage ? <ErrorMessage errorMessage={errorMessage}/> : null } */}
                    {isPending ? <Loader/> : null}
                    <button disabled={initialSubmitBlock} type="submit" className="button-std button-std--violet small">Зберегти данні</button>
                </Form>
            </Formik>
            {/*  Форма смены пароля */}
            <Formik
                initialValues={{
                  password: '',
                  changepassword: '',
                  old_pass: '',
                }}
                enableReinitialize={true}
                validationSchema={passwordSchema}
                onSubmit={(vals, { resetForm, setStatus, setSubmitting }) => {
                  // console.log(resetForm, 'reset');
                  setSubmitting(false);
                  dataStore.dispatch(changePasswordRequest(vals, resetForm));
                }}
                >
                    {({
                      values, errors, handleSubmit, handleChange, handleBlur,
                    }) => (<form className="form-std" onSubmit={handleSubmit}>
                            <div className="form-std__subtitle text-violet">Змінити ваш пароль:</div>
                            <div className={`input-group ${errors.old_pass && 'unfilled'}`}>
                                <input
                                    className="input-std"
                                    placeholder="Вкажіть ваш старий пароль:"
                                    type="text"
                                    name="old_pass"
                                    value={values.old_pass}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {
                                    errors.old_pass ? (
                                    <div className="error">
                                        {errors.old_pass}
                                    </div>
                                    ) : null
                                }
                            </div>
                            <div className={`input-group ${errors.password && 'unfilled'}`}>
                                <input
                                type="password"
                                name="password"
                                // value={values.password}
                                placeholder="Введіть новий пароль:"
                                className='input-std'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                />
                                {
                                    errors.password ? (
                                    <div className="error">
                                        {errors.password}
                                    </div>
                                    ) : null
                                }
                            </div>
                            <div className={`input-group ${errors.changepassword && 'unfilled'}`}>
                                <input
                                type="password"
                                name="changepassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // value={values.changepassword}
                                className='input-std'
                                placeholder="Повторіть новий пароль:"
                                value={values.changepassword}
                                />
                                {
                                    errors.changepassword ? (
                                    <div className="error">
                                        {errors.changepassword}
                                    </div>
                                    ) : null
                                }
                            </div>
                            {isPending ? <Loader/> : null}
                            <button type="submit" className="button-std button-std--violet small">Зберегти пароль</button>
                        </form>
                    )
                    }
                </Formik>
            </div>
            {errorMessage && <div className="el-for-alerts" style={
              { backgroundColor: messageColors[formMessageColor] }
            }>
              {errorMessage}
            </div>}
        </div>

  );
}
