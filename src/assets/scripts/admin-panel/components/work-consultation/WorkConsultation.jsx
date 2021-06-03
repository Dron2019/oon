import React from 'react';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import routes from '../../routes/routes.jsx';

export default function (props) {
  const history = useHistory();
  const consultQuestionInitForm = [
    {
      name: 'message',
      initialValue: '',
      signUpSchema: () => false,
      type: 'textarea',
      placeholder: 'Уведіть ваше запитання:',
      validation: (value) => {
        if (!value.length) return 'Введіть ваше повідомлення';
      },
    },
  ];
  return (
        <div className="cabinet-inner-double-part-wrapper">
            {props.title === false ? '' : <div className="title text-violet uppercased">Послуги консультанта з пошуку роботи </div>}
            <div className="white-bg-element with-padding cabinet-inner-double-part-wrapper__left">
                Кар’єрний хаб пропонує жінкам, постраждалим 
                від домашнього / гендерно зумовленого насильства,
                послуги для покращення професійних навичок та успішного працевлаштування. 
                Фахівці і фахівчині дотримуються індивідуального підходу до оцінки потреб і можливостей кожної жінки та допомагають
                побудувати персональну стратегію для досягнення вашої мети.
            </div>
            <div className="cabinet-inner-double-part-wrapper__right white-bg-element">
            <Formik
                initialValues={(() => {
                  const myObject = {};
                  consultQuestionInitForm.forEach(element => myObject[element.name] = element.initialValue);
                  return myObject;
                })()}
                onSubmit={
                    (values) => {
                      console.log(values);
                    }
                }
                >
                <Form className="form-std">
                    <div className="form-std__subtitle text-violet">
                        Поставити консультанту запитання
                    </div>
                    {consultQuestionInitForm.map(configField => <Field validate={configField.validation} name={configField.name} className="input-std">
                            {({
                              field, // { name, value, onChange, onBlur }
                              form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                              meta,
                            }) => (
                            <div className={`input-group ${meta.error ? 'unfilled' : ''}`}>
                                {configField.type === 'textarea'
                                  ? <textarea className='input-std' placeholder={configField.placeholder} {...field} />
                                  : <input className='input-std' placeholder={configField.placeholder} {...field} />
                                }

                                {meta.touched && meta.error && (
                                <div className="error">{meta.error}</div>
                                )}
                            </div>
                            )}
                        </Field>)}
                    <div className="input-group df aic wrap">
                        <a className="text-violet underlined " onClick={() => history.push(routes.questionsHistory)}>Історія запитань</a>
                        <button type='submit' className="button-std button-std--violet small mt-0">Надіслати запитання психологу</button>
                    </div>
                </Form>
            </Formik>
            </div>
        </div>
  );
}
