import React, { useState } from 'react';
import {
  Field, Form, Formik, FormikProps, ErrorMessage,
} from 'formik';
import { useSelector } from 'react-redux';
import {
  Redirect, useHistory, useLocation,
  Link,
} from 'react-router-dom';


import {
  setPending, login, loginAsync, restoreByToken,
} from '../../stores/userDataStore/actions.jsx';
import dataStore from '../../stores/userDataStore/index.jsx';
import Loader from '../loader/loader.jsx';

import ErrorView from '../error-message/ErrorMessage.jsx';

import routes from '../../routes/routes.jsx';

export default function LoginForm(props) {
  const [responseFromLogin, setResponse] = useState('');
  const history = useHistory();
  const isPending = useSelector(state => state.pendingStatusStore);
  const errorMessage = useSelector(state => state.loginStatusReducer.error);

  function loginSubmit(values, actions) {
    dataStore.dispatch(setPending());
    dataStore.dispatch(loginAsync(values, history));
  }
  // Запуск восттановления через електронную почту с последующий логином
  if (history.location.search.match(/token/) && isPending === false) {
    const GET = (function () {
      const array = history.location.search.replace('?', '').split('&').map(el => el.split('='));
      const obj = {};
      array.forEach((el) => {
        // eslint-disable-next-line prefer-destructuring
        obj[el[0]] = el[1];
      });
      return obj;
    }());
    dataStore.dispatch(restoreByToken(GET));
  }
  return (
        <div className="login-form">
            <h1 className="title text-violet">Мій кабінет</h1>
            <Redirect to={`/login${history.location.search}`} />
            <Formik
                validate={(el) => {
                  // const
                  const errors = {};
                  Object.entries(el).forEach((field) => {
                    // eslint-disable-next-line no-unused-expressions
                    field[1].length === 0 ? errors[field[0]] = 'Заповніть поле' : null;
                  });
                  return errors;
                }}
                initialValues={{ login: '', password: '' }}
                onSubmit={loginSubmit}>
                <Form className="form-std">
                    <div className="form-std__subtitle text-violet">Вхід до особистого кабінету</div>
                    <Field
                        name="login"
                        type="text">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors },
                      meta,
                    }) => (
                        <div className={meta.error ? 'input-group unfilled' : 'input-group'}>
                            <input
                                className="input-std"
                                    type="text"
                                    placeholder="Логін:" {...field}
                            />
                            {meta.touched && meta.error && (
                                <div
                                    className="error">{meta.error}
                                </div>
                            )}
                        </div>
                    )}
                    </Field>
                    {/* <div className="input-group">
                        <Field
                            className="input-std"
                            name="login"
                            placeholder="Логін:"
                            onInput={(evt) => { dataStore.dispatch({ type: 'ENTERNAME', value: evt.target.value }); }}/>
                      <ErrorMessage
                          className="error"
                          component="div"
                          name="login" />
                    </div> */}
                    <Field
                        name="password"
                        type="password">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors },
                      meta,
                    }) => (
                        <div className={meta.error ? 'input-group unfilled' : 'input-group'}>
                            <input
                                className="input-std"
                                    type="password"
                                    placeholder="Пароль:" {...field}
                            />
                            {meta.touched && meta.error && (
                                <div
                                    className="error">{meta.error}
                                </div>
                            )}
                        </div>
                    )}
                    </Field>

                    <button
                        className="button-std button-std--violet small"
                        type="submit">
                            Увійти до кабінету
                    </button>
                    {isPending ? <Loader/> : null}
                    {errorMessage ? <ErrorView errorMessage={errorMessage}/> : null }
                </Form>
            </Formik>
            <div className="white-bg-element">
                <Link
                    to={routes.forgotPassword}
                    className="button-std button-std--violet small transparent">
                    Забули пароль?
                </Link>
                <Link
                    to={routes.register}
                    className="button-std button-std--violet small transparent">
                    Зареєструватися
                </Link>
            </div>
        </div>
  );
}
