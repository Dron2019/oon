import React, { useState } from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';


import dataStore from '../../../stores/userDataStore/index.jsx';
import ErrorView from '../../error-message/ErrorMessage.jsx';
import { setPending, resetPending } from '../../../stores/userDataStore/actions.jsx';
import Loader from '../../loader/loader.jsx';
import { RECOVERY_PASSWORD } from '../../../stores/urls.jsx';
import routesMap from '../../../routes/routes.jsx';

export default function ForgotPassword(props) {
  const history = useHistory();
  const [message, setMessage] = useState('');
  const pending = useSelector(state => state.pendingStatusStore);


  function redirect() {
    setTimeout(() => {
      setMessage('');
      // history.push(routesMap.login);
    }, 1000);
  }

  function handleSubmit(values, formikApi) {
    dataStore.dispatch(setPending());
    const sendData = new FormData();
    Object.entries(values).forEach((el) => {
      sendData.append(el[0], el[1]);
    });
    sendData.append('ajax_data', 1);
    axios.post(RECOVERY_PASSWORD, sendData)
      .then((el) => {
        if (el.data.error === 0) {
          setMessage(decodeURIComponent(el.data.mess));
          formikApi.resetForm();
          dataStore.dispatch(resetPending());
          setTimeout(() => setMessage(''), 2000);
        } else if (el.data.error === 1) {
          setMessage(decodeURIComponent(el.data.mess));
          dataStore.dispatch(resetPending());
          setTimeout(() => setMessage(''), 2000);
        }
      })
      .catch((el) => {
        setMessage('Помилка, повторіть будь-ласка пізніше');
        setTimeout(() => setMessage(''), 2000);
        dataStore.dispatch(resetPending());
      });
    // !values.email.length ? null : setMessage('Имейл правильный');
  }
  return (
        <div className="forgot-password-wrapper">
            <div className="title text-violet uppercased">Мій кабінет</div>
            <Formik
                initialValues={{
                  email: '',
                }}
                validate={(value) => {
                  if (value.email.length <= 0) return { email: 'Введіть ваш e-mail',};
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) return { email: 'Невірний формат e-mail',};
                }}
                onSubmit={handleSubmit}
                >
                <Form 
                  className="form-std"
                  
                
                >
                    <label htmlFor="email" className="form-std__subtitle text-violet">Забули пароль?</label>
                      <Field name="email" >
                        {({ field, form, meta }) => {
                          return (
                            <div  className={(meta.touched && meta.error) ? 'input-group unfilled' : 'input-group'}>
                              <input  id="email" className="input-std" type="text" {...field} placeholder="Ваш e-mail"/>
                              {meta.touched &&
                                meta.error && <div className="error">{meta.error}</div>}
                            </div>
                          )
                        }}
                      </Field>
                    {/* <div className="input-group">
                        <Field
                            
                            className="input-std"
                            id="email"
                            name="email"
                            placeholder="E-mail:"
                            type="email"
                        />
                    </div> */}
                    {message ? <ErrorView errorMessage={message}/> : null }
                    {/* {message.length === 0 ? null :
                        <div className="input-group">
                        <div className="text-violet subtitle">{message}</div> </div>} */}
                    {pending ? <Loader/> : null}
                    <button
                        className="button-std button-std--violet small "
                        type="submit">
                        Відновити пароль
                    </button>
                </Form>
            </Formik>
            <div className="white-bg-element">
                <Link
                    to="/login"
                    className="button-std button-std--violet small transparent">
                    Ви згадали свій пароль?
                </Link>
                <Link
                    to="/register"
                    className="button-std button-std--violet small transparent">
                    Зареєструватися
                </Link>
            </div>
        </div>
  );
}
