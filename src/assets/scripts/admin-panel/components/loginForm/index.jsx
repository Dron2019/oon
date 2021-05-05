import React, { useState }  from 'react';
import { Field, Form, Formik, FormikProps,ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';
import {Redirect, useHistory} from 'react-router-dom';

import {setPending} from '../../stores/userDataStore/actions.jsx';
import dataStore from '../../stores/userDataStore/index.jsx'
import Loader from "../loader/loader.jsx";
import {login,loginAsync} from '../../stores/userDataStore/actions.jsx';
import {
    Link
  } from "react-router-dom";
import routes from '../../routes/routes.jsx';
export default function(props){ 
    const [responseFromLogin, setResponse] = useState('');
    const isSome = useSelector(state=>state.name);
    const history = useHistory();
    const isPending = useSelector(state=>state.pendingStatusStore);
    const userDataStore = useSelector(state=>state);
    const errorMessage = useSelector(state=>state.loginStatusReducer.error);
    function loginSubmit(values, actions) {
        dataStore.dispatch(setPending());
        dataStore.dispatch(loginAsync(values))
    }
    const isLogined = useSelector(state=>state.loginStatusReducer.isLogined);
    return (
        <div className="login-form">
            <div className="title text-violet">Мій кабінет</div>
            <Redirect to="/login" />
            <Formik
                initialValues={{ login:'', password: '' }}
                onSubmit={loginSubmit}>
                <Form className="form-std">
                    <div className="form-std__subtitle text-violet">Вхід до особистого кабінету</div>
                    <div className="input-group">
                        <Field 
                            className="input-std" 
                            name="login" 
                            placeholder="Логін:" 
                            onInput={(evt)=>{dataStore.dispatch({type:'ENTERNAME', value:evt.target.value })}}/>
                    </div>
                    <ErrorMessage 
                        component="div" 
                        name="login" />
                    <Field 
                        name="password" 
                        type="password">
                    {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                    }) => (
                        <div className="input-group">
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
                    <div className="input-group">
                        <div className="subtitle text-violet">{errorMessage}</div>
                    </div>
                    <button 
                        className="button-std button-std--violet small" 
                        type="submit">
                            Увійти до кабінету
                    </button>
                    {isPending ? <Loader/> : null}
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