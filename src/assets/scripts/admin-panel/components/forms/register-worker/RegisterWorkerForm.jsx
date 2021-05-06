import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Formik, Field,Form,FormikProps  } from 'formik';
import * as Yup from 'yup';


import {REGISTER_USER} from '../../../stores/urls.jsx';
import routes from '../../../routes/routes.jsx';
export default function(){
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
        console.log(values);
        const sendData = new FormData();
        Object.entries(values).forEach(value=>{
            sendData.append(value[0], value[1]);
        })
        axios.post(REGISTER_USER, sendData)
            .then(el=>console.log(el))
            .catch(el=>console.log(el))
        actions.setSubmitting(false);
    }

    const registerInputs = [
        {title:'Ім`я:',name:'name', initialValue: '', requiredClass: 'required'},
        {title:'Прізвище',name:'surname',initialValue: '', requiredClass: 'required'},
        {title:'E-mail:',name:'email',initialValue: '', requiredClass: 'required'},
        {type: "password", title:'Пароль',name:'password',initialValue: '', requiredClass: 'required'},
        {type: "password", title:'Підтвердження паролю',name:'confirmPassword',initialValue: '', requiredClass: 'required'},
        {title:'Телефон:',name:'tel',initialValue: '', requiredClass: false},
        {title:'Вік: (вкажіть скільки вам років)',name:'age',initialValue: '', requiredClass: false},
        {title:'Сімейний стан:',name:'family',initialValue: '', requiredClass: false},
        {title:'Досвід роботи (програміст, санітар)',name:'work-expirience',initialValue: '', requiredClass: false},
        {title:'Місце проживання (м. Київ, вул. Хрещатик 25)',name:'adress',initialValue: '', requiredClass: false},
        {title:'Складні життєві обставини (наркоман, п’яниця)',name:'live-problems',initialValue: '', requiredClass: false},
        {title: 'Освіта', name:'education', initialValues:'',requiredClass:false, as: 'select', values: ['Освіта', 'Вища', 'Середня']},
        {title: 'Сімейний стан', name:'family-status', initialValues:'',requiredClass:false, as: 'select', values: ['Сімейний стан', 'Одружена', 'Не одружена']},
        {title: 'Кількість дітей', name:'childs', initialValues:'',requiredClass:false, as: 'select', values: ['Кількість дітей', '1', '2', '3 і більше']},
    ]
    const inputs = [
        ['Ім`я:','name','','8'],
        ['Прізвище','surname','','8'],
        ['E-mail:','email','','8'],
        ['Пароль','password','','8'],
        ['Підтвердження паролю','confirmPassword','','8'],
        ['Телефон:','tel','',''],
        ['Вік: (вкажіть скільки вам років)','age','',''],
        ['Сімейний стан:','family','',''],
        ['Кількість дітей:','childs','',''],
        ['Досвід роботи (програміст, санітар)','work-expirience','',''],
        ['Місце проживання (м. Київ, вул. Хрещатик 25)','adress','',''],
        ['Складні життєві обставини (наркоман, п’яниця)','live-problems','',''],
    ];
    const selects = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const initialValues = (function(){
        const finalObject = {};
        inputs.forEach(el=>{
            finalObject[el[1]] = el[2];
        });
        return finalObject;
    })();
    const paintUnfilledValue = (data) => data.error!==undefined ? 'unfilled' : '';
    const setRequiredClass = (data) => data!==undefined && data.length>0 ? 'required' : '';
    return (
        <Formik 
            initialValues={initialValues} 
            onSubmit={handleSubmit} 
            validationSchema={SignupSchema}>
            <Form  className="form-std" >
            {registerInputs.map((input, index)=>{
                console.log(input.as === 'select');
                if (input.as === 'select') {
                    return (
                        <div className="input-group input-group-select">
                            <Field name={input.name} as="select" className="fw-500 text-black" >
                                {input.values.map((option) => <option value={option}>{option}</option>)}
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
            {/* {inputs.map((input,index)=>(
                <Field 
                    className="dd"
                    key={index}
                    name={input[1]}>
                {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
                }) => {
                    return (
                        <div 
                            className={`input-group ${paintUnfilledValue(meta)} ${setRequiredClass(input[3])}`} 
                            key={field.name}>
                            <input 
                                className="input-std" type="text"  
                                placeholder={input[0]} {...field} />
                            {
                            meta.touched && meta.error && (
                            <div className="error">{meta.error}</div>
                            )}
                        </div>
                    );
                }} */}
            {/* </Field> */}
            {/* ))} */}
            <div className="text-violet fw-500 required-legend-title">* обов’язкові поля для заповнення</div>
            <button type="submit" className="button-std button-std--violet small" >
                Зареєструватися як користувач
            </button>
         </Form>
        </Formik>
    )
}