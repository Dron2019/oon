import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import DateTimePicker from 'react-datetime-picker';
import { concat } from 'lodash';


import dataStore from '../../stores/userDataStore/index.jsx';
import {
  setPending, resetPending, loginFail, clearError,
} from '../../stores/dispatchActions.jsx';
import { sendOnlineConsultQuestion } from '../../stores/onlineConsultQuestionsStore/actions_onlineConsultQuestionsStore.jsx';
import ErrorMessage from '../error-message/ErrorMessage.jsx';
import Loader from '../loader/loader.jsx';
import routes from '../../routes/routes.jsx';

export default function OnlineConsultationRequest(props) {
  const history = useHistory();
  const [choosedDate, setDate] = useState(new Date());
  const isPending = useSelector(state => state.pendingStatusStore);
  const errorMessage = useSelector(state => state.loginStatusReducer.error);


  function formSubmit(values, form) {
    const textData = `${values.text} ${values.date}`;

    const sendData = {
      message: textData,
      title: values.theme,
    };

    dataStore.dispatch(sendOnlineConsultQuestion(sendData, form.resetForm));
    // dataStore.dispatch(setPending());
    // dataStore.dispatch(loginFail('Відправлено'));
    // setTimeout(() => {
    //   form.resetForm();
    //   dataStore.dispatch(resetPending());
    // }, 2000);
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
  return (
        <div className="online-consultation-request-wrapper">
            <div className="page-title text-violet"> Запит на онлайн консультацію</div>
            <div className="white-bg-element text-block">
            <p>Щоб домовитися про безкоштовну онлайн-консультацію з кар’єрним радником / радницею, заповніть, будь ласка, форму. На бажання, детальніше напишіть, які питання ви б хотіли розглянути на консультації.</p>
            <p>Статус заявки та посилання на онлайн-консультацію будуть доступні у вашому особистому кабінеті.</p>

            </div>
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
                <Form
                  className="form-std">
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
                        <a className="text-violet underlined " onClick={() => history.push(routes.onlineConsultQuestionsHistory)}>Історія запитань</a>
                        <button type='submit' className="button-std button-std--violet small mt-0">Надіслати запит</button>
                    </div>
                </Form>
            </Formik>
        </div>
  );
}
