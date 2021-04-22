import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import { Field, Form, Formik, FormikProps,ErrorMessage } from 'formik';
import dataStore from '../../stores/userDataStore/index.jsx'
import { useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom';
export default function(props){ 
    const [responseFromLogin, setResponse] = useState('');
    const isSome = useSelector(state=>state.isSome)
    console.log(isSome, 'ISSOME');
    function loginSubmit(values, actions) {
        // actions.setSubmitting(false);
        dataStore.dispatch({type:'LOGIN', login: values.login})
        setResponse('SEND');
        setTimeout(() => setResponse(''), 2000);
    }
    const isLogined = useSelector(state=>state.isLogined);
    console.log(isLogined, 'USER SELECT');
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
                    <Field className="input-std" name="login" placeholder="Логін:" onInput={(evt)=>{dataStore.dispatch({type:'ENTERNAME', value:evt.target.value })}}/>
                    <ErrorMessage component="div" name="login" />
                    <Field name="password" type="password">
                    {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                    }) => (
                        <div>
                        <input className="input-std" type="password" placeholder="Пароль:" {...field} />
                        {meta.touched && meta.error && (
                            <div className="error">{meta.error}</div>
                        )}
                        </div>
                    )}
                    </Field>
                    <div className="subtitle">{responseFromLogin}</div>
                    <button className="button-std button-std--violet" type="submit">Увійти до кабінету</button>
                </Form>
            </Formik>
        </div>
    );
}