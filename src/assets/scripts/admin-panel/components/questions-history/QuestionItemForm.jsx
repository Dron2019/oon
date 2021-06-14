import React from 'react';
import {
  Field, Form, Formik, FormikProps, ErrorMessage,
} from 'formik';

export default function QuestionItemForm(props) {
  function loginSubmit(vals, form) {
    if (vals.message.length === 0) return false;
    form.resetForm();
    props.callback(
      {
        time: new Date().getTime(),
        name: 'Богдан',
        side: 'client',
        mess: vals.message,
      },
    );
    return false;
  }
  return (
    <>
            <Formik
                initialValues={{ message: '' }}
                onSubmit={loginSubmit}

            >
            <Form className="form-std history-message-form">
                <div className="form-std__subtitle text-violet">Надіслати відповідь</div>
                <Field
                        name="message"
                        type="textarea">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors },
                      meta,
                    }) => (
                        <div className="input-group">
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
                    <div className="form__group">
                        <div className="text-orange end-question-item">
                            Завершити бесіду
                        </div>
                        <p className="text-gray question-item-form-text-s">
                            Натискаючи, діалог потрапить до історії. Клієнт
                            завжди може відновити цей діалог і він зноу перейде до вхідних заявок.
                        </p>
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
