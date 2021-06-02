import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field,Form,FormikProps  } from 'formik';
import DateTimePicker from 'react-datetime-picker';

import routes from '../../routes/routes.jsx';

export default function(props){
    const history = useHistory();

    const [choosedDate, setDate] = useState(new Date());
    console.log(formFields);
    function formSubmit(values, form) {
        console.log(values);
    }
    const formFields = [
        {
          title: 'Тема консультації:',
          name: 'theme',
          initialValue: '',
          requiredClass: 'required',
          validationSchema: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        },
        {
          title: 'Бажана дата проведення консультації:',
          name: 'date',
          value: choosedDate,
          initialValue: choosedDate.toLocaleString(),
          requiredClass: 'required',
          validationSchema: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
          innerElems:  <DateTimePicker
                locale='uk-UA'
                value={choosedDate} 
                onChange={setDate}
            />
        },
        {
          title: 'Текст повідомлення:',
          name: 'text',
          initialValue: '',
          requiredClass: 'required',
          type: 'textarea',
          validationSchema: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        },
      ];;
    return (
        <div className="online-consultation-request-wrapper">
            <div className="page-title text-violet"> Запит на онлайн консультацію</div>
            <div className="white-bg-element">
            Кар’єрний хаб пропонує жінкам, постраждалим від домашнього / гендерно зумовленого насильства, послуги для покращення професійних навичок та успішного працевлаштування. Фахівці і фахівчині дотримуються індивідуального підходу до оцінки потреб і можливостей кожної жінки та допомагають побудувати персональну стратегію для досягнення вашої мети.
            </div>
            
            <Formik 
                enableReinitialize={true}
                initialValues={(()=>{
                    const myObject = {};
                    formFields.forEach(element=> myObject[element.name] = element.initialValue );
                    return myObject;
                })()}
                onSubmit={formSubmit}
            >
                <Form className="form-std">
                    {formFields.map(configField=> {
                       return <Field value="fegege" validate={configField.validation} name={configField.name}  className="input-std">
                                {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                                }) => (
                                <div className={'input-group ' + (meta.error?'unfilled':'')}>
                                    {configField.type === 'textarea' ? 
                                        <textarea  className='input-std' placeholder={configField.title} {...field} /> :
                                        <input   className='input-std' placeholder={configField.title} {...field} /> 
                                    }
                                    {configField.innerElems ? configField.innerElems : ''}
                                    
                                    {meta.touched && meta.error && (
                                    <div className="error">{meta.error}</div>
                                    )}
                                </div>
                                )}
                            </Field>
                    })}
                   
                </Form>
                {/* <form className="form-std">
                    <div className="form-std__subtitle text-violet">
                        Отримати консультацію консультанта
                    </div>
                    <div className="input-group">
                        <input className="input-std" type="text" name="text" id="" />
                    </div>
                    <div className="input-group df aic wrap">
                        <a  className="text-violet underlined " onClick={()=>history.push(routes.questionsHistory)}>Історія запитань</a>
                        <button type='submit' className="button-std button-std--violet small mt-0">Отримати консультацію</button>
                    </div>
                </form> */}
            </Formik>
        </div>
    )
    function getFields() {
        return [
            {
              title: 'Тема консультації:',
              name: 'theme',
              initialValue: '',
              requiredClass: 'required',
              validationSchema: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            },
            {
              title: 'Бажана дата проведення консультації:',
              name: 'date',
              value: choosedDate,
              initialValue: 'vdvdvdv',
              requiredClass: 'required',
              validationSchema: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            },
            {
              title: 'Текст повідомлення:',
              name: 'text',
              initialValue: '',
              requiredClass: 'required',
              type: 'textarea',
              validationSchema: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            },
          ];
    }
}

