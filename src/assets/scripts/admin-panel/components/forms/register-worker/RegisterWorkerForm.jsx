import React, {useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { Formik, Field,Form,FormikProps  } from 'formik';
import * as Yup from 'yup';

import ErrorView from '../../error-message/ErrorMessage.jsx';
import dataStore from '../../../stores/userDataStore/index.jsx';
import Loader from '../../loader/loader.jsx';
import {setPending, resetPending} from '../../../stores/userDataStore/actions.jsx';
import {REGISTER_USER} from '../../../stores/urls.jsx';
import {formDataConstruction} from '../../../stores/helpFunctions.jsx';
import routes from '../../../routes/routes.jsx';
export default function(){
    const [errorMessageAfterRequest, setError] = useState('');
    const formFields = useSelector(state=>state.registerWorkerFormReducer);
    const isPending = useSelector(state=>state.pendingStatusStore);

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
            .required("Enter password"),
            // .matches(
            //     /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            //     "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            // ),
        confirmPassword: Yup
            .string()
            .required("Confirm password")
            .when("password", {
            is: password => (password && password.length > 0 ? true : false),
            then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match")
            })
    });
    function handleSubmit(values, actions){


        const userData = {}
        const sendData = new FormData();
        sendData.append('ajax_data',1);
        Object.entries(values).forEach(value=>{
            userData[value[0]] = value[1];
        });
        dataStore.dispatch(setPending());
        sendData.append('userData', JSON.stringify(userData));
        axios.post(REGISTER_USER, sendData)
        .then(response=>{
            switch (response.data.error) {
                    case 0:
                        setError(decodeURIComponent(response.data.mess));
                        setTimeout(() =>  setError(''), 2000);
                        dataStore.dispatch(resetPending());
                        actions.resetForm();
                        break;
                    case 1:
                        setError(decodeURIComponent(response.data.mess));
                        setTimeout(() =>  setError(''), 2000);
                        dataStore.dispatch(resetPending());
                }
            })
            .catch(el=>{
                setError(decodeURIComponent('Помилка відправки'));
                setTimeout(() =>  setError(''), 2000);
                dataStore.dispatch(resetPending());
            })
        actions.setSubmitting(false);
    }

    const initialValues = (function(){
        const finalObject = {};
        formFields.forEach(el=>{
            finalObject[el.name] = el.initialValue;
        });
        return finalObject;
    })();
    const paintUnfilledValue = (data) => data.error!==undefined ? 'unfilled' : '';
    const setRequiredClass = (data) => data!==undefined && data.length>0 ? 'required' : '';
    return (
        <Formik 
        enableReinitialize={true} 
            initialValues={(function(){
                const finalObject = {};
                formFields.forEach(el=>{
                    finalObject[el.name] = el.initialValue;
                });
                return finalObject;
            })()} 
            onSubmit={handleSubmit} 
            validationSchema={SignupSchema}>
            <Form  className="form-std" >
            {formFields.map((input, index)=>{
                if (input.as === 'select') {
                    return (
                        <div key={index+'aa'} className="input-group input-group-select">
                            <Field key={index+'bb'} name={input.name} as="select" className="fw-500 text-black" >
                                {input.values.map((option) => <option key={option[0]} value={option[0]}>{option[1]}</option>)}
                                </Field>
                        </div>
                    )
                } else {
                    return (
                            <Field key={index} name={input.name} placeholder={input.title} className="input-std" as={input.as}>
                            {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                            }) => {
                                return (
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
                                );
                            }}
                            
                            </Field>
                    )
                }
            })}
            {errorMessageAfterRequest ? <ErrorView errorMessage={errorMessageAfterRequest}/> : null}
            <div className="text-violet fw-500 required-legend-title">* обов’язкові поля для заповнення</div>
            <button type="submit" className="button-std button-std--violet small" >
                Зареєструватися як користувач
            </button>
            {isPending ? <Loader/> : null}
         </Form>
        </Formik>
    )
}