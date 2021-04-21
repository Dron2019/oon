import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import { Field, Form, Formik, FormikProps,ErrorMessage } from 'formik';
import dataStore from '../../stores/userDataStore/index.jsx'
export default function(props){ 
    const [responseFromLogin, setResponse] = useState('');
    function loginSubmit(values, actions) {
        console.log(JSON.stringify(values, null, 2));
        // actions.setSubmitting(false);
        setResponse('SEND');
        setTimeout(() => setResponse(''), 2000);
    }
    console.log(dataStore.getState());
    return (
        <div>
            <Formik
                initialValues={{ login:'', password: '' }}
                onSubmit={loginSubmit}>
            <Form>
                <div onClick={()=>{
                    dataStore.dispatch({type:'LOGIN'})
                }} className="page-title">Вхід до особистого кабінету</div>
                <div></div>
                <Field name="login" placeholder="Логін:" />
                <ErrorMessage component="div" name="login" />
                <Field name="password" type="password">
                {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                }) => (
                    <div>
                    <input type="password" placeholder="Пароль:" {...field} />
                    {meta.touched && meta.error && (
                        <div className="error">{meta.error}</div>
                    )}
                    </div>
                )}
                </Field>
                <div className="subtitle">{responseFromLogin}</div>
                <button type="submit">Submit</button>
            </Form>
            </Formik>
        </div>
    );
}