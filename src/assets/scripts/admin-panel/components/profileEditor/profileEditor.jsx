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
  const profileEditorFields = useSelector(state => state.profileInfoReducers);
  const errorMessage = useSelector(state => state.loginStatusReducer.error);
  // const errorMessage = 'Ваша сессия истекла, зайдите заново';
  const isPending = useSelector(state => state.pendingStatusStore);
  const initialValues = {};
  profileEditorFields.forEach((field) => {
    if (field.initialValue
      || field.value) initialValues[field.name] = field.initialValue || field.value;
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
                }}>
                <Form className="form-std">
                    <div className="form-std__subtitle text-violet">Ваші особисті дані</div>
                    {profileEditorFields.map((field_config, index) => (
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
                                {meta.touched && meta.error && (
                                <div className="error">{meta.error}</div>
                                )}
                            </div>
                            )}
                        </Field>
                    ))}
                    {errorMessage ? <ErrorMessage errorMessage={errorMessage}/> : null }
                    {isPending ? <Loader/> : null}
                    <button type="submit" className="button-std button-std--violet small">Зберегти данні</button>
                </Form>
            </Formik>
            {/*  Форма смены пароля */}
            <Formik
                initialValues={{
                  password: '',
                  changepassword: '',
                  old_pass: '',
                }}
                validationSchema={passwordSchema}
                onSubmit={(vals, form) => {
                  console.log(vals, 'PASS SUBMIT');
                  dataStore.dispatch(changePasswordRequest(vals));
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
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {
                                    errors.old_pass ? (
                                    <div class="error">
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
                                />
                                {
                                    errors.password ? (
                                    <div class="error">
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
                                />
                                {
                                    errors.changepassword ? (
                                    <div class="error">
                                        {errors.changepassword}
                                    </div>
                                    ) : null
                                }
                            </div>
                            {errorMessage ? <ErrorMessage errorMessage={errorMessage}/> : null }
                            {isPending ? <Loader/> : null}
                            <button type="submit" className="button-std button-std--violet small">Зберегти пароль</button>
                        </form>
                    )
                    }
                </Formik>
            </div>
        </div>

  );
}
