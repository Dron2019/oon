import React from 'react';
import { Field, Form, Formik, FormikProps,ErrorMessage } from 'formik';
export default function(props) {
    function loginSubmit(vals, form){
        if (vals.message.length === 0)    return false;
        console.log(form);
        form.resetForm()
        props.callback(
            {
                time: new Date().getTime(),
                name: 'Богдан',
                side: 'client',
                mess: vals.message
            }
        )

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
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
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
                    <button 
                        className="button-std button-std--violet small" 
                        type="submit">
                            Надіслати відповідь
                    </button>
            </Form>
                
            </Formik>
        </>
    )
}