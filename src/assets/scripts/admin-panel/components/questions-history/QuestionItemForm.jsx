import React from 'react';
import {
  Field, Form, Formik, FormikProps,
} from 'formik';
import ErrorMessage from '../error-message/ErrorMessage.jsx';
export default function QuestionItemForm(props) {
    const { errorMessage } = props;
  function loginSubmit(vals, form) {
    if (vals.message.length === 0) return false;
    form.resetForm();
    props.callback(vals);
    return false;
  }
  return (
    <>
            <Formik
                initialValues={{ message: '' }}
                onSubmit={loginSubmit}
                validate={(vals) => {
                    if (vals.message.length <= 0) {
                        return {
                            message: 'Введіть ваше повідомлення'
                        }
                    }
                }}
            >
            <Form className="form-std history-message-form">
                <div className="form-std__subtitle text-violet">Надіслати відповідь</div>
                <Field
                        name="message"
                        type="textarea">
                    {({
                      field, // { name, value, onChange, onBlur }
                      meta,
                    }) => (
                        <div className={(meta.touched && meta.error) ? 'input-group unfilled' : 'input-group'}>
                            <textarea
                                className="input-std"
                                    type="text"
                                    placeholder="Ваше повідомлення:" {...field}
                            />
                            {meta.touched && meta.error && (
                                <div
                                    className="error">{meta.error}
                                </div>
                            )}
                        </div>
                    )}
                    </Field>
                    {errorMessage && <ErrorMessage errorMessage={errorMessage}/>}
                    <div className="form__group">
                        {props.userType === 'consult'
                        && <>
                            <div className="text-orange end-question-item" onClick={props.closeQuestion}>
                                Завершити бесіду
                            </div>
                            <p className="text-gray question-item-form-text-s">
                                Натискаючи, діалог потрапить до історії. Клієнт
                                завжди може відновити цей діалог і
                                він зноу перейде до вхідних заявок.
                            </p>
                        </>
                        }
                        
                        <button
                            className="button-std button-std--violet small"
                            type="submit">
                                Надіслати відповідь
                        </button>
                    </div>
            </Form>

            </Formik>
    </>
  );
}
