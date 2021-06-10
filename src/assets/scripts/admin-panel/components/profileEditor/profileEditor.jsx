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

import ProfileEditorCounter from '../ProfileEditorCounter/index.jsx';
import Loader from '../loader/loader.jsx';
import ErrorMessage from '../error-message/ErrorMessage.jsx';
import dataStore from '../../stores/userDataStore/index.jsx';
import { ajax_getProfileData, getProfileData, ajax_setProfileData } from '../../stores/profileInfoStore/actions_profileInfoStore.jsx';

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
    password: Yup.string().required('This field is required'),
    changepassword: Yup.string().when('password', {
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
                                <input
                                    title={field_config.title}
                                    disabled = {disabledFields[field_config.name] === true}
                                    className='input-std'
                                    type={field_config.type ? field_config.type : 'text'}
                                    placeholder={field_config.title || ''} {...field} />
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
            <Formik
                initialValues={{
                  password: '',
                  changepassword: '',
                }}
                validationSchema={passwordSchema}
                onSubmit={() => {}}
                >
                    {({
                      values, errors, handleSubmit, handleChange, handleBlur,
                    }) => {
                      console.log(errors);
                      return (
                        <form className="form-std" onSubmit={handleSubmit}>
                            <div className="form-std__subtitle text-violet">Змінити ваш пароль:</div>
                            <div className="input-group">
                                <input
                                    className="input-std"
                                    placeholder="Вкажіть ваш старий пароль:"
                                    type="password"
                                    name="old_password"
                                />
                            </div>
                            <div className="input-group">
                                <input
                                type="password"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                placeholder="Password"
                                className='input-std'
                                />
                                {
                                    Object.keys(errors).length > 0 ? (
                                    <div class="error">
                                        {errors.password}
                                    </div>
                                    ) : null
                                }
                            </div>
                            <div className="input-group">
                                <input
                                type="password"
                                name="changepassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.changepassword}
                                className='input-std'
                                placeholder="Confirm Password"
                                />
                                {
                                    Object.keys(errors).length > 0 ? (
                                    <div class="error">
                                        {errors.changepassword}
                                    </div>
                                    ) : null
                                }
                            </div>
                            <button type="submit" className="button-std button-std--violet small">Зберегти пароль</button>
                        </form>
                      );
                    }}
                </Formik>
            </div>
        </div>

  );
}
