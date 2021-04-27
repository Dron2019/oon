import React from 'react';
import { Formik, Field,Form,FormikProps  } from 'formik';
import * as Yup from 'yup';
export default function(){
    const SignupSchema = Yup.object().shape({
        surname: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup
            .string()
            .required("Enter password")
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
        confirmPassword: Yup
            .string()
            .required("Confirm password")
            .when("password", {
            is: password => (password && password.length > 0 ? true : false),
            then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match")
            })
    });
    function handleSubmit(values, actions){
        console.log(values);
        actions.setSubmitting(false);
    }
    const inputs = [
        ['Ім`я:','name','','8'],
        ['Прізвище','surname','','8'],
        ['Телефон:','tel','',''],
        ['E-mail:','email','','8'],
        ['Вік: (вкажіть скільки вам років)','age','',''],
        ['Освіта:','education','',''],
        ['Сімейний стан:','family','',''],
        ['Кількість дітей:','childs','',''],
        ['Досвід роботи (програміст, санітар)','work-expirience','',''],
        ['Місце проживання (м. Київ, вул. Хрещатик 25)','adress','',''],
        ['Складні життєві обставини (наркоман, п’яниця)','live-problems','',''],
        ['Пароль','password','','8'],
        ['Підтвердження паролю','confirmPassword','','8'],
    ]
    const initialValues = (function(){
        const finalObject = {};
        inputs.forEach(el=>{
            finalObject[el[1]] = el[2];
        });
        return finalObject;
    })();
    const paintUnfilledValue = (data) => data.error!==undefined ? 'unfilled' : '';
    const setRequiredClass = (data) => data!==undefined && data.length>0 ? 'required' : '';
    return (
        <Formik 
            initialValues={initialValues} 
            onSubmit={handleSubmit} 
            validationSchema={SignupSchema}>
            <Form  className="form-std" >
            {inputs.map((input,index)=>(
                <Field 
                    key={index}
                    name={input[1]}>
                {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
                }) => {
                    return (
                        <div 
                            className={`input-group ${paintUnfilledValue(meta)} ${setRequiredClass(input[3])}`} 
                            key={field.name}>
                            <input 
                                className="input-std" type="text"  
                                placeholder={input[0]} {...field} />
                            {
                            meta.touched && meta.error && (
                            <div className="error">{meta.error}</div>
                            )}
                        </div>
                    );
                }}
            </Field>
            ))}
            <button type="submit" className="button-std button-std--violet" >
                Зареєструватися
            </button>
         </Form>
        </Formik>
    )
}