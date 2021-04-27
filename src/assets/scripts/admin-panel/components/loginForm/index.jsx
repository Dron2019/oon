import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import { Field, Form, Formik, FormikProps,ErrorMessage } from 'formik';
import dataStore from '../../stores/userDataStore/index.jsx'
import { useSelector } from 'react-redux';
import {Redirect, useHistory} from 'react-router-dom';
import {login} from '../../stores/userDataStore/actions.jsx';
import {
    Link
  } from "react-router-dom";
import routes from '../../routes/routes.jsx';
export default function(props){ 
    const [responseFromLogin, setResponse] = useState('');
    const isSome = useSelector(state=>state.isSome);
    const history = useHistory();
    
    function loginSubmit(values, actions) {
        setTimeout(() => setResponse(''), 2000);
        // history.push(routes.cabinet);
        dataStore.dispatch(login())
    }
    const isLogined = useSelector(state=>state.isLogined);
    // console.log(dataStore.getState());
    return (
        <div className="login-form">
            <div className="title text-violet">Мій кабінет</div>
            <Redirect to="/login" />
            <Formik
                initialValues={{ login:'', password: '' }}
                onSubmit={loginSubmit}>
                <Form className="form-std">
                    <div className="form-std__subtitle text-violet">Вхід до особистого кабінету</div>
                    <Field 
                        className="input-std" 
                        name="login" 
                        placeholder="Логін:" 
                        onInput={(evt)=>{dataStore.dispatch({type:'ENTERNAME', value:evt.target.value })}}/>
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
                    <div className="subtitle">{responseFromLogin}</div>
                    <button 
                        className="button-std button-std--violet" 
                        type="submit">
                            Увійти до кабінету
                    </button>
                </Form>
            </Formik>
            <div className="white-bg-element">
                <Link 
                    to={routes.forgotPassword} 
                    className="button-std button-std--violet"> 
                    Забули пароль?
                </Link>
                <Link 
                    to={routes.register} 
                    className="button-std button-std--violet"> 
                    Зареєструватися
                </Link>
            </div>
        </div>
    );
}