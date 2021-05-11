import React from 'react';
import { Formik, Field,Form,FormikProps  } from 'formik';
import * as Yup from 'yup';
export default function(props) {

    const formInitObject = [
        {name:'message', initialValue: '', signUpSchema:()=>{ return false; }, placeholder:'Уведіть ваше запитання:', validation:(value)=>{
            if (!value.length) return 'Введіть ваше повідомлення';
        }},
    ]
    return (
        <>
            <div className="title text-violet uppercased">Послуги консультанта з пошуку роботи </div>
            <div className="white-bg-element">Кар’єрний хаб пропонує жінкам, постраждалим від домашнього / гендерно зумовленого насильства, послуги для покращення професійних навичок та успішного працевлаштування. Фахівці і фахівчині дотримуються індивідуального підходу до оцінки потреб і можливостей кожної жінки та допомагають побудувати персональну стратегію для досягнення вашої мети.</div>
            <div className="white-bg-element">
            <Formik 
                initialValues={(()=>{
                    const myObject = {};
                    formInitObject.forEach(element=> myObject[element.name] = element.initialValue );
                    return myObject;
                })()}
                onSubmit={
                    (values)=>{
                        console.log(values);
                    }
                }
                >
                <Form className="form-std">
                    <div className="form-std__subtitle text-violet">
                        Поставити консультанту запитання
                    </div>
                    {formInitObject.map(configField=>{
                        return <Field validate={configField.validation} name={configField.name}  className="input-std">
                            {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                            }) => (
                            <div className={'input-group ' + (meta.error?'unfilled':'')}>
                                <input type="text" className='input-std' placeholder={configField.placeholder} {...field} />
                                {meta.touched && meta.error && (
                                <div className="error">{meta.error}</div>
                                )}
                            </div>
                            )}
                        </Field>
                    })}
                    <button type='submit' className="button-std button-std--violet small">Надіслати запитання психологу</button>
                </Form>
            </Formik>
            </div>
        </>
    )
}