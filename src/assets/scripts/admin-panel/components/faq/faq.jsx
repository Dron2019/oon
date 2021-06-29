/* exported */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'react-accessible-accordion/dist/fancy-example.css';

import QuestionItem from '../questions-history/QuestionItem.jsx';
import dataStore from '../../stores/userDataStore/index.jsx';
import {
  setPending, resetPending, loginFail, clearError,
} from '../../stores/dispatchActions.jsx';
import ErrorMessage from '../error-message/ErrorMessage.jsx';
import Loader from '../loader/loader.jsx';
import { getFaqUserQuestions, sendFaqQuestion, getSingleFaqQuestion } from '../../stores/faqStore/actions_faqStore.jsx';
import { GET_FAQ_STATIC_QUESTIONS_URL } from '../../stores/urls.jsx';


function getFaqQuestions() {
  return [
    { title: 'Як записатися на вебінар?', content: 'Домашнє та гендерно зумовлене насильство - проблема, з якою стикається надто багато людей в нашій країні. Фонд ООН у галузі народонаселення разом із партнерами створив кампанію “Розірви коло”, яка вже багато років допомагає усім, хто постраждав від насильства, отримати інформацію та розірвати це коло. ' },
    { title: 'Консультант не коректно відповідає', content: 'Домашнє та гендерно зумовлене насильство - проблема, з якою стикається надто багато людей в нашій країні. Фонд ООН у галузі народонаселення разом із партнерами створив кампанію “Розірви коло”, яка вже багато років допомагає усім, хто постраждав від насильства, отримати інформацію та розірвати це коло. ' },
    { title: 'Як редагувати профіль?', content: 'Домашнє та гендерно зумовлене насильство - проблема, з якою стикається надто багато людей в нашій країні. Фонд ООН у галузі народонаселення разом із партнерами створив кампанію “Розірви коло”, яка вже багато років допомагає усім, хто постраждав від насильства, отримати інформацію та розірвати це коло. ' },
  ];
}

export default function faq() {
  const [questions, setQuestions] = useState([]);
  const history = useHistory();
  const [choosedDate, setDate] = useState(new Date());
  const isPending = useSelector(state => state.pendingStatusStore);
  const errorMessage = useSelector(state => state.loginStatusReducer.error);
  const messages = useSelector(state => state.faqStore);
  const userID = useSelector(state => state.loginStatusReducer.id);
  const userType = useSelector(state => state.loginStatusReducer.role);
  /** Статические вопросы получаются напрямую из компонента */
  useEffect(() => {
    dataStore.dispatch(getFaqUserQuestions());
    const data = new FormData();
    data.append('ajax_data', '1');
    axios.post(GET_FAQ_STATIC_QUESTIONS_URL, data)
      .then((res) => {
        switch (res.data.error) {
          case 0:
            setQuestions(res.data.request || []);
            break;
          case 1:
            dataStore.dispatch(loginFail(res.data.mess));
            break;
          default:
            break;
        }
      })
      .catch((el) => {})
      .finally((el) => {
        setTimeout(() => {
          dataStore.dispatch(clearError());
        }, 2000);
      });
  }, []);
  const formFields = [
    {
      title: 'Уведіть тему запитання:',
      name: 'title',
      initialValue: '',
      type: 'text',
      requiredClass: '',
      validationSchema: Yup.string()
        .min(2, 'Уведіть тему запитання:')
        .required('Уведіть тему запитання:'),
    },
    {
      title: 'Уведіть ваше запитання:',
      name: 'message',
      initialValue: '',
      type: 'textarea',
      requiredClass: '',
      validationSchema: Yup.string()
        .min(2, 'Уведіть ваше запитання:')
        .required('Уведіть ваше запитання:'),
    },
  ];
  function formSubmit(values, form) {
    dataStore.dispatch(sendFaqQuestion(values, form.resetForm));
    setTimeout(() => {
      form.resetForm();
      dataStore.dispatch(resetPending());
    }, 2000);
  }
  return (
        <div className="faq-wrapper">
            <div className="page-title text-violet">Часті запитання (FAQ)</div>
            {messages.map((message, index) => (
              <QuestionItem
                hideForm
                getSingleFaqQuestion={getSingleFaqQuestion}
                // sendSingleOnlineConsultQuestion={sendSingleOnlineConsultQuestion}
                // closeOnlineConsultQuestion={closeOnlineConsultQuestion}
                // recoverOnlineConsultConversation={recoverOnlineConsultConversation}
                key={index}
                {...message}
                userID={userID}
                userType={userType}/>
            ))}
            <Accordion>
                {questions.map((singleQuestion, index) => (
                    <AccordionItem key={`faq${index}`}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="subtitle-small text-violet">
                                    {singleQuestion.title}
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                {singleQuestion.text}
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))
                }
            </Accordion>
            <Formik
                enableReinitialize={true}
                validationSchema={(() => {
                  const validation = {};
                  formFields.forEach((field) => {
                    validation[field.name] = field.validationSchema;
                  });
                  return Yup.object().shape(validation);
                })()}
                initialValues={(() => {
                  const myObject = {};
                  formFields.forEach((element) => {
                    myObject[element.name] = element.initialValue;
                  });
                  return myObject;
                })()}
                onSubmit={formSubmit}
            >
                <Form className="form-std">
                    <div className="form-std__subtitle text-violet">
                        Поставити запитання адміністратору
                    </div>
                    {formFields.map(configField => <Field
                                        key={`key ${configField.name}`}
                                        value="fegege"
                                        validate={configField.validationSchema}
                                        name={configField.name}
                                        className="input-std">
                                {({
                                  field, // { name, value, onChange, onBlur }
                                  form: { touched, errors },
                                  meta,
                                }) => (
                                <div key={`key ${configField.name}`} className={`input-group ${meta.error ? 'unfilled ' : ''}${configField.requiredClass}`}>
                                    {configField.type === 'textarea'
                                      ? <textarea className='input-std' placeholder={configField.title} {...field} />
                                      : <input className='input-std' placeholder={configField.title} {...field} />
                                    }
                                    {configField.innerElems ? configField.innerElems : ''}

                                    {meta.touched && meta.error && (
                                    <div className="error">{meta.error}</div>
                                    )}
                                </div>
                                )}
                            </Field>)}
                    {isPending && <ErrorMessage errorMessage={errorMessage}/>}
                    {isPending && <Loader/>}
                    <div className="input-group df aic wrap">
                        <button type='submit' className="button-std button-std--violet small ">Надіслати запитання адміністратору</button>
                    </div>
                </Form>
            </Formik>
        </div>
  );
}
