import React from 'react';
import axios from 'axios';
import { Formik, Field,Form,FormikProps  } from 'formik';
import * as Yup from 'yup';

export default function(){
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
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    console.log(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }, 1000);
            }}
        >
            <Form className="form-std">
            {registerInputs.map((element, index)=>{
                return (
                    <Field key={index}  name={element.name}>
                    {({ field, form, meta }) => (
                        <div key={index} className={`input-group ${paintUnfilledValue(meta)} ${setRequiredClass(element.requiredClass)}`} >
                            <input 
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
            <div className="text-violet fw-500 required-legend-title">* обов’язкові поля для заповнення</div>
            <button type="submit" className="button-std button-std--violet small" >
                Зареєструватися як соціальний працівник
            </button>
            </Form>
        </Formik>
    )
}