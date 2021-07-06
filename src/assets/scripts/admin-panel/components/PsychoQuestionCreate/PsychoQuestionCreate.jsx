/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';
import * as Yup from 'yup';
import DateTimePicker from 'react-datetime-picker';

import {
  setPending, resetPending, loginFail, clearError,
} from '../../stores/dispatchActions.jsx';
import routes from '../../routes/routes.jsx';
import store from '../../stores/userDataStore/index.jsx';
// eslint-disable-next-line camelcase
import { getProfileData, ajax_getProfileData } from '../../stores/profileInfoStore/actions_profileInfoStore.jsx';
import { getPsychoQuestions, sendPsychoQuestion } from '../../stores/psychoQuestionsStore/actions_psychoQuestionsStore.jsx';
import ErrorMessage from '../error-message/ErrorMessage.jsx';

export default function PsychoQuestionCreate() {
  const [choosedDate, setDate] = useState(new Date());
  const isPending = useSelector(state => state.pendingStatusStore);
  const errorMessage = useSelector(state => state.loginStatusReducer.error);
  const questions = useSelector(state => state.psychoQuestionsStore);
  const profileFields = useSelector(state => state.profileInfoReducers);
  const [profileFillingPercentage, setProfileFillingPercentage] = useState(0);

  function countFields(fields) {
    const counted = fields.reduce((acc, el) => {
      if (el.value && el.value.length > 0 && +el.value !== 0) return acc + 1;
      return acc;
    }, 0);
    const countInPercent = 100 * counted / fields.length;
    return countInPercent;
  }
  useEffect(() => {
    store.dispatch(getPsychoQuestions());
    store.dispatch(ajax_getProfileData());
  }, []);
  useEffect(() => {
    setProfileFillingPercentage(countFields(profileFields));
  }, [profileFields]);
  // store.dispatch(getProfileData());
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
      innerElems: <DateTimePicker
                minDate={new Date()}
                locale='uk-UA'
                value={choosedDate}
                onChange={setDate}
            />,
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
  function handleSubmit(values, form) {
    console.table(values);
    store.dispatch(sendPsychoQuestion(values, form.resetForm));
    // sendPsychoQuestion
  }
  return (
    <div className="psycho-querstion-create-wrapper">
      <div className="page-title text-violet">Послуги психолога</div>
      <div className="psycho-querstion-create-wrapper__left">
        <div className="white-bg-element with-padding">
          <p>Ми підтримуємо комплексний підхід до вирішення проблем. Кар’єрні радники й радниці, за потреби, можуть направити жінок на безкоштовну онлайн-консультацію з психологом / психологинею. Психологи / психологині працюють за індивідуальним підходом до кожної. </p>
          <p>Вони надають персональні поради, як впоратися саме з вашим досвідом насильства та почати шлях до гармонійного й фінансово незалежного життя.
        Щоб поставити запитання психологу / психологині, заповніть форму. Текст відповіді буде доступний у вашому особистому кабінеті.</p>

        </div>
        <div className="white-bg-element with-padding social-icons-wrapper">
          <div className="subtitle-small text-violet">
            Взяти участь у онлайн групах підтримки
          </div>
          <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5306 0.5H11.0661C13.2882 0.5 15.0967 2.30856 15.0967 4.5306V11.0661C15.0967 13.2882 13.2882 15.0967 11.0661 15.0967H4.5306C2.30856 15.0967 0.5 13.2882 0.5 11.0661V4.5306C0.5 2.30856 2.30856 0.5 4.5306 0.5Z" stroke="#2A3341"/>
              <path d="M4.09456 7.79853C4.09456 5.75667 5.7565 4.09473 7.79836 4.09473C9.84022 4.09473 11.5022 5.75667 11.5022 7.79853C11.5022 9.84039 9.84022 11.5023 7.79836 11.5023C5.7565 11.5023 4.09456 9.84039 4.09456 7.79853Z" stroke="#2A3341"/>
              <path d="M11.6259 2.9707H11.6292" stroke="#2A3341" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.37516 3.58971H8.79901V1.10983C8.55336 1.07603 7.70854 1 6.72465 1C4.67173 1 3.26542 2.29128 3.26542 4.66458V6.84877H1V9.62109H3.26542V16.5967H6.04294V9.62174H8.21673L8.56181 6.84942H6.04229V4.93947C6.04294 4.13819 6.25869 3.58971 7.37516 3.58971V3.58971Z" stroke="#2A3341"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="psycho-querstion-create-wrapper__right">

      <div className="white-bg-element">
        {profileFillingPercentage < 50 && (
        <div className="blocking-block text-orange">
          <span>
            <Link to={routes.profileEditor}>
              Заповніть профіль&nbsp;
            </Link>
            повністю для доступу до наступних функцій:
          </span>
        </div>
        )}
        <Formik
          onSubmit={handleSubmit}
          initialValues={{}}
          validate={(vals) => {
            const errors = {};
            !vals.title ? errors.title = 'Введіть тему:' : null;
            !vals.message ? errors.message = 'Введіть питання:' : null;
            return errors;
          }}
        >
          <Form className="form-std">
            <div className="form-std__subtitle text-violet">Поставити психологу запитання</div>
            <Field name="title" className="input-std">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors },
                  meta,
                }) => (
                <div className={`input-group ${meta.error ? 'unfilled' : ''}`}>
                    <input className='input-std' placeholder="Уведіть ваше запитання" {...field} />
                    {errors.title && (
                    <div className="error">{errors.title}</div>
                    )}
                </div>
                )}
            </Field>
            <Field name="message" className="input-std">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors },
                  meta,
                }) => (
                <div className={`input-group ${meta.error ? 'unfilled' : ''}`}>
                    <textarea className='input-std' placeholder="Уведіть ваше запитання" {...field} />
                    {errors.message && (
                    <div className="error">{errors.message}</div>
                    )}
                </div>
                )}
            </Field>
            {errorMessage && <ErrorMessage errorMessage={errorMessage}/>}
            <div className="input-group input-group--buttons df aic wrap">
              <Link className="text-violet" to={routes.psychoQuestionHistory}>Історія запитань</Link>
              <button type="submit" className="button-std button-std--violet small">Надіслати запитання психологу</button>
            </div>
          </Form>
        </Formik>
        {/* <Formik
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
                onSubmit={handleSubmit}
            >
              <Form className="form-std">
                  {formFields.map((configField, index) => <Field key={index} value="fegege" validate={configField.validationSchema} name={configField.name} className="input-std">
                              {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors },
                                meta,
                              }) => (
                              <div className={`input-group ${meta.error ? 'unfilled ' : ''}${configField.requiredClass}`}>
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
                  <div className="input-group input-group--buttons df aic wrap">
                      <Link className="text-violet" to={routes.questionsHistory}>Історія запитань</Link>
                      <button type='submit' className="button-std button-std--violet small mt-0">Надіслати запитання психологу</button>
                  </div>
              </Form>
            </Formik> */}
      </div>
      </div>
    </div>
  );
}
