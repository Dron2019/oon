/* eslint-disable prefer-destructuring */
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';
import * as Yup from 'yup';

import ErrorView from '../../error-message/ErrorMessage.jsx';
import dataStore from '../../../stores/userDataStore/index.jsx';
import Loader from '../../loader/loader.jsx';
import { setPending, resetPending } from '../../../stores/userDataStore/actions.jsx';
import { setMessageColor } from '../../../stores/messageStatusStore/messageStatusActions.jsx';
import { REGISTER_USER } from '../../../stores/urls.jsx';
import routes from '../../../routes/routes.jsx';

export default function RegisterWorkerForm() {
  const [errorMessageAfterRequest, setError] = useState('');
  const formFields = useSelector(state => state.registerWorkerFormReducer);
  const isPending = useSelector(state => state.pendingStatusStore);
  const history = useHistory();
  const SignupSchema = Yup.object().shape({
    surname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup
      .string()
      .required('Enter password'),
    // .matches(
    /*
       "Password must contain at least 8 characters,
    one uppercase, one number and one special case character"
    */
    // ),
    agreement: Yup
    .boolean()
    .required('Необхідно надати згоду')
    .oneOf([true], 'Необхідно надати згоду'),
    confirmPassword: Yup
      .string()
      .required('Confirm password')
      .when('password', {
        is: password => (!!(password && password.length > 0)),
        then: Yup.string().oneOf([Yup.ref('password')], "Password doesn't match"),
      }),
  });
  function handleSubmit(values, actions) {
    const userData = {};
    const sendData = new FormData();
    sendData.append('ajax_data', 1);
    Object.entries(values).forEach((value) => {
      userData[value[0]] = value[1];
    });
    dataStore.dispatch(setPending());
    sendData.append('userData', JSON.stringify(userData));
    axios.post(REGISTER_USER, sendData)
      .then((response) => {
        dataStore.dispatch(setMessageColor(response.data.error));
        switch (response.data.error) {
          case 0:
            let time = 5;
            setError(`
            ${response.data.mess}. Вас переправить на сторінку авторизації, 
            де ви можете ввести ваш e-mail та пароль для входу до особистого кабінету.\nПерехід на сторінку через ${time} секунд
            `);
            const interval = setInterval(() => {
              time--;
              setError(`
              ${response.data.mess}. Вас переправить на сторінку авторизації, 
              де ви можете ввести ваш e-mail та пароль для входу до особистого кабінету.\nПерехід на сторінку через ${time} секунд
              `);
              if (time === 0) {
                clearInterval(interval);
                setError('');
              }
            }, 1000);
            dataStore.dispatch(resetPending());
            actions.resetForm();
            window.dispatchEvent(new Event('succesRegistration'));
            setTimeout(() => {
              history.push(routes.login);
              dataStore.dispatch(resetPending());
              // setError('');
            }, 5000);
            break;
          case 1:
            setError(decodeURIComponent(response.data.mess));
            setTimeout(() => setError(''), 2000);
            dataStore.dispatch(resetPending());
            break;
          default:
            setError(decodeURIComponent(response.data.mess));
            // setTimeout(() => setError(''), 2000);
            
        }
      })
      .catch((el) => {
        setError(decodeURIComponent('Помилка відправки'));
        setTimeout(() => setError(''), 2000);
        dataStore.dispatch(resetPending());
      });
    actions.setSubmitting(false);
  }

  const initialValues = (function inVals() {
    const finalObject = {};
    formFields.forEach((el) => {
      finalObject[el.name] = el.initialValue;
    });
    return finalObject;
  }());
  const paintUnfilledValue = data => (data.error !== undefined ? 'unfilled' : '');
  const setRequiredClass = data => (data !== undefined && data.length > 0 ? 'required' : '');
  return (
        <Formik
        enableReinitialize={true}
            initialValues={(function initValues() {
              const finalObject = {};
              formFields.forEach((el) => {
                finalObject[el.name] = el.initialValue;
              });
              return finalObject;
            }())}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}>
            <Form className="form-std" >
            {formFields.map((input, index) => {
              if (input.as === 'select') {
                return (
                        <div key={`${index}aa`} className="input-group input-group-select">
                            <Field key={`${index}bb`} name={input.name} as="select" className="fw-500 text-black" >
                                {input.values.map(option => (
                                    <option key={option[0]} value={option[0]}>{option[1]}</option>
                                ))}
                                </Field>
                        </div>
                );
              }
              if (input.as === 'checkbox') {
                return (
                  <Field key={index} name={input.name} placeholder={input.title} className="input-std" as={input.as}>
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors },
                    meta,
                  }) => (
                          <div
                              className={`input-group input-group--checkbox ${paintUnfilledValue(meta)} ${setRequiredClass(input.requiredClass)}`}
                              key={field.name}>
                              <label htmlFor={input.name} className="text-violet text-checkbox-group">{input.title}</label>
                              <input
                                  className="input-std" id={input.name} type={input.type !== undefined ? input.type : 'text'}
                                  {...field} />
                              <label htmlFor={input.name} className="decorate-checkbox"></label>
                              {
                              meta.error && (
                              <div className="error">{meta.error}</div>
                              )}
                          </div>
                  )}

                  </Field>
                );
              }
              return (
                            <Field key={index} name={input.name} placeholder={input.title} className="input-std" as={input.as}>
                            {({
                              field, // { name, value, onChange, onBlur }
                              form: { touched, errors },
                              meta,
                            }) => (
                                    <div
                                        className={`input-group ${paintUnfilledValue(meta)} ${setRequiredClass(input.requiredClass)}`}
                                        key={field.name}>
                                        <input
                                            className="input-std" type={input.type !== undefined ? input.type : 'text'}
                                            placeholder={input.title} {...field} />
                                        {
                                        meta.touched && meta.error && (
                                        <div className="error">{meta.error}</div>
                                        )}
                                    </div>
                            )}

                            </Field>
              );
            })}
            {errorMessageAfterRequest ? <ErrorView errorMessage={errorMessageAfterRequest}/> : null}
            <div className="text-violet fw-500 required-legend-title">* обов’язкові поля для заповнення</div>
            <button type="submit" className="button-std button-std--violet small" >
                Зареєструватися як користувач
            </button>
            {isPending ? <Loader/> : null}
         </Form>
        </Formik>
  );
}
