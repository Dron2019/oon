import React from 'react';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import routes from '../../routes/routes.jsx';

import { sendConsultQuestion } from '../../stores/consultQuestionsStore/consult-questions-actions.jsx';
import dataStore from '../../stores/userDataStore/index.jsx';
import ErrorMessage from '../error-message/ErrorMessage.jsx';

export default function (props) {
  const history = useHistory();
  const errorMessage = useSelector(state => state.loginStatusReducer.error);
  const consultQuestionInitForm = [
    {
      name: 'title',
      initialValue: '',
      signUpSchema: () => false,
      type: 'text',
      placeholder: 'Введіть тему повідомлення:',
      validation: (value) => {
        if (!value.length) return 'Введіть тему повідомлення:';
        return undefined;
      },
    },
    {
      name: 'message',
      initialValue: '',
      signUpSchema: () => false,
      type: 'textarea',
      placeholder: 'Введіть ваше запитання:',
      validation: (value) => {
        if (!value.length) return 'Введіть ваше повідомлення:';
        return undefined;
      },
    },
  ];
  return (
        <div className="cabinet-inner-double-part-wrapper">
            {props.title === false ? '' : <div className="page-title text-violet uppercased">Послуги консультанта з пошуку роботи </div>}
            <div className="white-bg-element with-padding cabinet-inner-double-part-wrapper__left">
            <p>На цій сторінці ви можете скористатися безкоштовними послугами кар’єрного радника / радниці. Вони до кожної жінки застосовують індивідуальний підхід та персонально визначають оптимальний шлях досягнення мети. Залиште запитання у формі збоку або надішліть запит на онлайн-консультацію. Під час зустрічі фахівці / фахівчині оцінять ваші кар’єрні потреби та нададуть індивідуальні рекомендації.</p>
            <p>Текст відповіді, статус заявки та посилання на онлайн-консультацію будуть доступні у вашому особистому кабінеті.</p>

            </div>
            <div className="cabinet-inner-double-part-wrapper__right white-bg-element">
            <Formik
                initialValues={(() => {
                  const myObject = {};
                  consultQuestionInitForm.forEach((element) => {
                    myObject[element.name] = element.initialValue;
                  });
                  return myObject;
                })()}
                onSubmit={
                    (values, form) => {
                      dataStore.dispatch(sendConsultQuestion(values, form));
                      console.log(values);
                    }
                }
                >
                <Form className="form-std">
                    <div className="form-std__subtitle text-violet">
                        Поставити консультанту запитання
                    </div>
                    {consultQuestionInitForm.map((configField, index) => <Field key={index} validate={configField.validation} name={configField.name} className="input-std">
                            {({
                              field, // { name, value, onChange, onBlur }
                              form: { touched, errors },
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
                    {errorMessage && <ErrorMessage errorMessage={errorMessage}/>}
                    <div className="input-group df aic wrap">
                        <a className="text-violet underlined " onClick={() => history.push(routes.questionsHistory)}>Історія запитань</a>
                        <button type='submit' className="button-std button-std--violet small ">Надіслати запитання</button>
                    </div>
                </Form>
            </Formik>
            </div>
        </div>
  );
}
