import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import { Formik, Field,Form } from 'formik';
import DateTimePicker from 'react-datetime-picker';


import dataStore from '../../stores/userDataStore/index.jsx';
import {setPending, resetPending, loginFail, clearError} from '../../stores/dispatchActions.jsx';
import ErrorMessage from '../error-message/ErrorMessage.jsx';
import Loader from '../loader/loader.jsx';
import routes from '../../routes/routes.jsx';

export default function(props){
    
    const history = useHistory();
    const [choosedDate, setDate] = useState(new Date());
    const isPending = useSelector(state => state.pendingStatusStore);
    const errorMessage = useSelector(state=>state.loginStatusReducer.error);


    function formSubmit(values, form) {
        dataStore.dispatch(setPending());
        dataStore.dispatch(loginFail('Відправлено'));
        setTimeout(() => {
            form.resetForm();
            dataStore.dispatch(resetPending());
            
        }, 2000);
    }
    const formFields = [
        {
          title: 'Тема консультації:',
          name: 'theme',
          initialValue: '',
          requiredClass: 'required',
          validationSchema: Yup.string()
            .min(2, 'Введіть тему консультації')
            .required('Введіть тему консультації:'),
        },
        {
          title: 'Бажана дата проведення консультації:',
          name: 'date',
          value: choosedDate,
          initialValue: choosedDate.toLocaleString(),
          requiredClass: 'required',
          validationSchema: Yup.string()
        //   .date()
        //     .min(new Date(), 'Дата повинна бути')
            .required('Оберіть дату консультації'),
          innerElems:  <DateTimePicker
                minDate={new Date()}
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
            .min(2, 'Введіть текст повідомлення')
            .required('Введіть текст повідомлення:'),
        },
      ];
    return (
        <div className="online-consultation-request-wrapper">
            <div className="page-title text-violet"> Запит на онлайн консультацію</div>
            <div className="white-bg-element text-block">
                Кар’єрний хаб пропонує жінкам, 
                постраждалим від домашнього / гендерно зумовленого насильства, 
                послуги для покращення професійних навичок та успішного працевлаштування. 
                Фахівці і фахівчині дотримуються індивідуального підходу до оцінки потреб і можливостей кожної жінки та допомагають побудувати персональну стратегію для досягнення вашої мети.
            </div>
            
            <Formik 
                enableReinitialize={true}
                validationSchema={(() => {
                    let validation = {};
                    formFields.forEach(field=>validation[field.name] = field.validationSchema)
                    return Yup.object().shape(validation);
                })()}
                initialValues={(()=>{
                    const myObject = {};
                    formFields.forEach(element=> myObject[element.name] = element.initialValue );
                    return myObject;
                })()}
                onSubmit={formSubmit}
            >
                <Form className="form-std">
                    {formFields.map(configField=> {
                       return <Field value="fegege" validate={configField.validationSchema} name={configField.name}  className="input-std">
                                {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                                }) => (
                                <div className={'input-group ' + (meta.error?'unfilled ':'') + (configField.requiredClass)}>
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
                    {isPending && <ErrorMessage errorMessage={errorMessage}/>}
                    {isPending && <Loader/>}
                    <div className="input-group df aic wrap">
                        <a  className="text-violet underlined " onClick={()=>history.push(routes.questionsHistory)}>Історія запитань</a>
                        <button type='submit' className="button-std button-std--violet small mt-0">Надіслати запитання психологу</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

