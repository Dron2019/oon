import React, {useState} from 'react';
import axios from 'axios';
import { Formik, Field,Form,FormikProps  } from 'formik';
import * as Yup from 'yup';

import {REGISTER_CONSULT} from '../../../stores/urls.jsx';
export default function(){
    const [errorMessageAfterRequest, setError] = useState('');
    const registerInputs = [
        {title:'Ім`я:',name:'name', initialValue: '', requiredClass: 'required', 
            validationSchema: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        },
        {title:'По батькові:',name:'fatherName',initialValue: '', requiredClass: 'required',
            validationSchema: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
        },
        {title:'Прізвище',name:'surname',initialValue: '', requiredClass: 'required',
            validationSchema: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
        },
        {   title:'E-mail:',name:'email',initialValue: '', requiredClass: 'required',
            validationSchema: Yup.string().email('Invalid email').required('Required'),
        },
        {title:'Телефон:',name:'tel',initialValue: '', requiredClass: 'required',
            validationSchema: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
        },
        {type: 'password',title:'Пароль',name:'password',initialValue: '', requiredClass: 'required',
            validationSchema: Yup
                .string()
                .required("Enter password"),
        },
        {type: 'password',title:'Підтвердження паролю',name:'confirmPassword', initialValue: '', requiredClass: 'required',
            validationSchema:  Yup
                .string()
                .required("Confirm password")
                .when("password", {
                    is: password => (password && password.length > 0 ? true : false),
                    then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match")
                    })
        },
    ];
    const paintUnfilledValue = (data) => data.error!==undefined ? 'unfilled' : '';
    const setRequiredClass = (data) => data!==undefined && data.length>0 ? 'required' : '';
    const signUpSchemaObject = {};
    function handleSubmit(values, actions){
        const userData = {}
        const sendData = new FormData();
        sendData.append('ajax_data',1);
        Object.entries(values).forEach(value=>{
            userData[value[0]] = value[1];
        })
        sendData.append('consultData', JSON.stringify(userData));
        axios.post(REGISTER_CONSULT, sendData)
            .then(el=>{
                setError('error');
                setTimeout(() =>  setError(''), 2000);
            })
            .catch(el=>console.log(el))
        actions.setSubmitting(false);
    }
    Object.entries(registerInputs).forEach(el=>{
        signUpSchemaObject[el[1].name] =  el[1].validationSchema || '';
    });
    console.log(signUpSchemaObject);
    const SignupSchema = Yup.object().shape(
        signUpSchemaObject
    );
    return (
        <Formik
            validationSchema={SignupSchema}
            initialValues={{}}
            onSubmit={handleSubmit}
        >
            <Form className="form-std">
            {registerInputs.map((element, index)=>{
                return (
                    <Field key={index}  name={element.name}>
                    {({ field, form, meta }) => (
                        <div key={index} className={`input-group ${paintUnfilledValue(meta)} ${setRequiredClass(element.requiredClass)}`} >
                            <input 
                                key={index}
                                type={element.type ? element.type : 'text'} {...field} 
                                className="input-std" 
                                placeholder={element.title}/>
                            {meta.touched &&
                            meta.error && <div className="error">{meta.error}</div>}
                        </div>
                    )}
                </Field>
                )
            })}
            <div className="input-group">
                <div className="subtitle text-violet">{errorMessageAfterRequest}</div>
            </div>
            <div className="text-violet fw-500 required-legend-title">* обов’язкові поля для заповнення</div>
            <button type="submit" className="button-std button-std--violet small" >
                Зареєструватися як соціальний працівник
            </button>
            </Form>
        </Formik>
    )
}