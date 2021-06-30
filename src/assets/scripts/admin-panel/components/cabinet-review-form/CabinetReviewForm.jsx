/* eslint-disable camelcase */
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';
import { useClickAway } from 'react-use';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import dataStore from '../../stores/userDataStore/index.jsx';


const initState = [
  {
    title: 'Тема',
    name: 'theme',
    initialValue: '',
    requiredClass: 'required',
    // validationSchema: {},
    type: 'select',
    selects: [
      ['Оберіть тему повідомлення', '0'],
      ['Відгук', '1'],
      ['Відгук', '2'],
      ['Відгук', '3'],
    ],

  },
  {
    title: 'Повідомлення:',
    name: 'name',
    initialValue: '',
    requiredClass: 'required',
    placeholder: 'Ваше повідомлення',
    validationSchema: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    type: 'textarea',
  },
];

export default function CabinetReviewForm(props) {
  const isPending = useSelector(state => state.pendingStatusStore);
  const ref = useRef(null);
  useClickAway(ref, () => {
    gsap.to(ref.current.parentElement, {
      y: 50,
      autoAlpha: 0,
      duration: 0.35,
      onComplete: () => {
        props.onClose();
      },
    });
  });
  useEffect(() => {
    gsap.from(ref.current, { autoAlpha: 0.5, y: 50 });
  }, ref);

  function getSchema() {
    const innerSchema = {};
    initState.forEach((el) => {
      // eslint-disable-next-line no-unused-expressions
      el.validationSchema !== undefined ? innerSchema[el.name] = el.validationSchema : null;
    });
    return Yup.object().shape(innerSchema);
  }
  return (
    <div className="cabinet-review-form-wrapper">
      <Formik
                enableReinitialize
                initialValues={{}}
                validationSchema={
                  getSchema
                }
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);
                }}>
                <Form
                  className="form-std cabinet-review-form"
                  ref={ref}
                >
                  <svg className="form-review-close" onClick={() => {
                    gsap.to(ref.current.parentElement, {
                      y: 50,
                      autoAlpha: 0,
                      duration: 0.35,
                      onComplete: () => {
                        props.onClose();
                      },
                    });
                  } } width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 15L1 1M1 15L15 1L1 15Z" stroke="#991E66" stroke-width="2"/>
                    </svg>
                    <div className="form-std__subtitle text-violet">Зворотній зв’язок</div>
                    {initState.map((field_config, index) => {
                      if (field_config.type === 'select') {
                        return (
                            <div key={`${index}aa`} className="input-group input-group-select">
                            <div className="error placeholder-in-focus">{field_config.selects[0][0]}</div>
                            <Field key={`${index}bb`} name={field_config.name} className="fw-500 text-black" as={field_config.type}>
                                {field_config.selects.map((option, i) => (
                                    <option key={i} value={option[1]}>{option[0]}</option>
                                ))}
                                </Field>
                            </div>
                        );
                      }
                      return (
                          <Field key={index} name={field_config.name} as={field_config.type}>
                            {({
                              field, // { name, value, onChange, onBlur }
                              form: { touched, errors },
                              meta,
                            }) => (
                            <div className={meta.error !== undefined ? 'unfilled input-group' : 'input-group'}>
                                {field_config.type === 'textarea'
                                  ? <textarea className='input-std' placeholder={field_config.placeholder} {...field} />
                                  : <input className='input-std' placeholder={field_config.placeholder} {...field} />
                                }
                                {/* <input
                                    title={field_config.title}
                                    className='input-std'
                                    // type={field_config.type ? field_config.type : 'text'}
                                    placeholder={field_config.title || ''} {...field} /> */}
                                {/* {field_config.title &&
                                  <div className="error placeholder-in-focus">
                                  {field_config.title}</div>} */}
                                {meta.touched && meta.error && (
                                <div className="error">{meta.error}</div>
                                )}
                            </div>
                            )}
                          </Field>
                      );
                    })}
                    {isPending ? <Loader/> : null}
                    <button type="submit" className="button-std button-std--violet small">Надіслати повідомлення</button>
                </Form>
            </Formik>
    </div>
  );
}
