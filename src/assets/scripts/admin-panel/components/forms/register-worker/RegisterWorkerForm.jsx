import React from 'react';
import { Formik, Field,Form,FormikProps  } from 'formik';
import routes from '../../../routes/routes.jsx'
export default function(){
    console.log(routes, 'ROUTES');
    function handleSubmit(values, actions){
        console.log(values);
        actions.setSubmitting(false);
    }
    const inputs = [
        ['Ім`я:','name',''],
        ['Прізвище','surname',''],
        ['Телефон:','tel',''],
        ['E-mail:','email',''],
        ['Вік: (вкажіть скільки вам років)','age',''],
        ['Освіта:','education',''],
        ['Сімейний стан:','family',''],
        ['Кількість дітей:','childs',''],
        ['Досвід роботи (програміст, санітар)','work-expirience',''],
        ['Місце проживання (м. Київ, вул. Хрещатик 25)','adress',''],
        ['Складні життєві обставини (наркоман, п’яниця)','live-problems',''],
    ]
    const initialValues = (function(){
        const finalObject = {};
        inputs.forEach(el=>{
            finalObject[el[1]] = el[2];
        });
        return finalObject;
    })();
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form  className="form-std" >
            {inputs.map((input,index)=>(
                <Field name={input[1]}>
                {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
                }) => (
                <div className="input-group" required key={field.name}>
                    <input className="input-std" type="text"  placeholder={input[0]} {...field} />
                    {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                    )}
                </div>
                )}
            </Field>
            ))}
            {/* <Field name="color" as="select" onChange={(e)=>console.log(e)}>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
            </Field> */}
           <button type="submit" className="button-std button-std--violet" >
             Submit
           </button>
         </Form>
        </Formik>
    )
}