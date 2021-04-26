import React from 'react';
import { Formik } from 'formik';
export default function(){
    const inputs = ['Ім`я:',
        'Прізвище',
        'Телефон:',
        'E-mail:',
        'Вік: (вкажіть скільки вам років)',
        'Освіта:',
        'Сімейний стан:',
        'Кількість дітей:',
        'Досвід роботи (програміст, санітар)',
        'Місце проживання (м. Київ, вул. Хрещатик 25)',
        'Складні життєві обставини (наркоман, п’яниця)',]

    return (
        <Formik>
            <form onSubmit={()=>{}}>
            {inputs.map(input=><input value={input}></input>)}
           <button type="submit" className="button-std button-std--violet" >
             Submit
           </button>
         </form>
        </Formik>
    )
}