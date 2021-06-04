/* eslint-disable camelcase */
/* eslint-disable no-multi-assign */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';
import * as Yup from 'yup';

import Loader from '../loader/loader.jsx';
import ErrorMessage from '../error-message/ErrorMessage.jsx';
import dataStore from '../../stores/userDataStore/index.jsx';
import { ajax_getProfileData, getProfileData, ajax_setProfileData } from '../../stores/profileInfoStore/actions_profileInfoStore.jsx';

export default function (props) {
  dataStore.dispatch(getProfileData());
  const firstRender = useMemo(
    () => dataStore.dispatch(ajax_getProfileData()),
    [],
  );
  const profileEditorFields = useSelector(state => state.profileInfoReducers);
  console.log(profileEditorFields);
  const errorMessage = useSelector(state => state.loginStatusReducer.error);
  // const errorMessage = 'Ваша сессия истекла, зайдите заново';
  const isPending = useSelector(state => state.pendingStatusStore);
  const initialValues = {};
  profileEditorFields.forEach((field) => {
    initialValues[field.name] = field.initialValue || field.value;
  });
  const disabledFields = {
    email: true,
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
      email_r: Yup.string().email('Invalid email').required('Required'),
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
  // function simulatePathDrawing(pathArg, fillPercentage = 10, strokeWidth) {
  //   const path = pathArg;
  //   if (path.done) return;
  //   path.style.strokeDasharray = 0;
  //   path.style.strokeDashoffset = 0;
  //   // var path = document.querySelector('.squiggle-animated path');
  //   const length = setDashoffsetCircle(path);
  //   path.style.transition = path.style.WebkitTransition = 'none';
  //   path.style.fill = 'none';
  //   path.style.strokeDashoffset = '0';
  //   path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 1.5s ease';
  //   // Set up the starting positions
  //   path.style.strokeDasharray = `${length * (fillPercentage / 100)} ${length}`;
  //   path.style.strokeDashoffset = length + length * (fillPercentage / 100);
  //   path.style.transformOrigin = center;
  //   // Trigger a layout so styles are calculated & the browser
  //   // picks up the starting position before animating
  //   path.style.strokeWidth = strokeWidth;
  //   path.done = true;
  // }
  return (
        <div className="profile-editor-wrapper">
            <div className="page-title text-violet uppercased">Редагувати профіль</div>
            <div className="white-bg-element with-padding profile-editor-wrapper__left">
                <div className="text-violet subtitle-small fw-600">Ваш профіль заповнено на:</div>
                <svg width="190" height="190" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="95" cy="95" r="95" fill="#F8F8F8"/>
                    <path d="M47.9498 172.893C37.7208 166.714 28.8089 158.581 21.723 148.958C14.6371 139.335 9.516 128.411 6.652 116.809C3.78801 105.207 3.23724 93.1544 5.03116 81.3395C6.82508 69.5247 10.9285 58.1788 17.1073 47.9498C23.286 37.7208 31.419 28.8089 41.0418 21.723C50.6647 14.6371 61.589 9.51599 73.191 6.652C84.7931 3.78801 96.8456 3.23724 108.66 5.03116C120.475 6.82508 131.821 10.9285 142.05 17.1073C152.279 23.286 161.191 31.419 168.277 41.0418C175.363 50.6647 180.484 61.589 183.348 73.1911C186.212 84.7931 186.763 96.8456 184.969 108.66C183.175 120.475 179.071 131.821 172.893 142.05C166.714 152.279 158.581 161.191 148.958 168.277C139.335 175.363 128.411 180.484 116.809 183.348C105.207 186.212 93.1544 186.763 81.3395 184.969C69.5246 183.175 58.1788 179.071 47.9498 172.893L47.9498 172.893Z" stroke="#991E66" stroke-width="8"/>
                    <path d="M53.9816 160.356C45.372 155.053 37.8913 148.106 31.9665 139.912C26.0417 131.718 21.7889 122.437 19.451 112.599C17.113 102.761 16.7356 92.5594 18.3403 82.5757C19.945 72.5921 23.5005 63.0223 28.8036 54.4127C34.1068 45.8032 41.0538 38.3224 49.248 32.3976C57.4422 26.4729 66.7232 22.2201 76.5609 19.8821C86.3987 17.5441 96.6007 17.1667 106.584 18.7714C116.568 20.3761 126.138 23.9316 134.747 29.2347C143.357 34.5379 150.838 41.4849 156.762 49.6791C162.687 57.8733 166.94 67.1543 169.278 76.9921C171.616 86.8299 171.993 97.0318 170.389 107.015C168.784 116.999 165.228 126.569 159.925 135.178C154.622 143.788 147.675 151.269 139.481 157.194C131.287 163.118 122.006 167.371 112.168 169.709C102.33 172.047 92.1282 172.424 82.1446 170.82C72.161 169.215 62.5912 165.66 53.9816 160.356L53.9816 160.356Z" stroke="#991E66" stroke-width="4"/>
                </svg>
                <div className="text ">Ви отримали доступ до повного функціоналу особистого кабінету</div>
            </div>
            <div className="white-bg-element profile-editor-wrapper__right">
            {/* <div
                className="button-std button-std--violet"
                onClick={()=>{dataStore.dispatch(ajax_getProfileData())}}
                >
                    testAjax
            </div> */}
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
                                    placeholder={field_config.title} {...field} />
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
