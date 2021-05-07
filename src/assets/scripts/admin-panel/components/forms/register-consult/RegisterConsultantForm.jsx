import React, {useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { Formik, Field,Form,FormikProps  } from 'formik';
import * as Yup from 'yup';

import {REGISTER_CONSULT} from '../../../stores/urls.jsx';

export default function(){
    const [errorMessageAfterRequest, setError] = useState('');
    const regInputs = useSelector(state=>state.registerConsultFormReducer);

    const paintUnfilledValue = (data) => data.error!==undefined ? 'unfilled' : '';
    const setRequiredClass = (data) => data!==undefined && data.length>0 ? 'required' : '';

    function handleSubmit(values, actions){
        const userData = {}
        const sendData = new FormData();
        sendData.append('ajax_data',1);
        Object.entries(values).forEach(value=>{
            userData[value[0]] = value[1];
        });
        
        sendData.append('consultData', JSON.stringify(userData));
        axios.post(REGISTER_CONSULT, sendData)
            .then(el=>{
                setError('error');
                setTimeout(() =>  setError(''), 2000);
            })
            .catch(el=>console.log(el))
        actions.setSubmitting(false);
    }
    //Сбор схемы валидации по всем инпутам
    const signUpSchemaObject = {};
    Object.entries(regInputs).forEach(el=>{
        signUpSchemaObject[el[1].name] =  el[1].validationSchema || '';
    });
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
            {regInputs.map((element, index)=>{
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