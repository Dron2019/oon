import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import {useHistory } from "react-router-dom";


// export default class extends React.Component {
//     constructor(props){
//         super(props);
//     }
//     render(){
//     function redirect() {
//         let path = `/login`;
//         console.log(history);
//         let history = useHistory();
//         // history.push(path);
//     }
//     return (
//         <>
//             <Formik
//                 initialValues={{
//                     email: '',
//                 }}
//                 onSubmit={(values) => {
//                     // alert(JSON.stringify(values, null, 2));
//                     // console.log(Redirect('/login'));
//                     redirect();
                   
//                 }}
//                 >
//                 <Form  className="form-std">

//                     <label htmlFor="email" className="form-std__subtitle text-violet">Забули пароль?</label>
//                     <Field
//                     className="input-std"
//                     id="email"
//                     name="email"
//                     placeholder="E-mail:"
//                     type="email"
//                     />
//                     <button className="button-std button-std--violet" type="submit">Submit</button>
//                 </Form>
//             </Formik>
//             <div className="white-bg-element">
//                 <Link to="/login" className="button-std button-std--violet"> Ви згадали свій пароль?</Link>
//                 <button className="button-std button-std--violet"> Зареєструватися</button>
//             </div>
//         </>
//     )
//     }
// }
export default function(props) {
    let history = useHistory();
    const [message,setMessage] = useState('');
    function redirect() {
        let path = `/login`;        
        setTimeout(() => {
            history.push(path);
        }, 1000);
    }
    return (
        <>
            <div className="title text-violet uppercased">Мій кабінет</div>
            <Formik
                initialValues={{
                    email: '',
                }}
                onSubmit={(values,formikApi) => {
                    console.log(values);
                    !values.email.length ? null : setMessage('Имейл правильный');
                    formikApi.resetForm();
                    console.log(formikApi);
                    setTimeout(() => {
                        setMessage('');
                        redirect();
                    }, 1000);
                }}
                >
                <Form  className="form-std">
                    <label htmlFor="email" className="form-std__subtitle text-violet">Забули пароль?</label>
                    <Field
                    required
                    className="input-std"
                    id="email"
                    name="email"
                    placeholder="E-mail:"
                    type="email"
                    />
                    {message.length === 0 ? null : <div>{message}</div>}
                    <button className="button-std button-std--violet" type="submit">Submit</button>
                </Form>
            </Formik>
            <div className="white-bg-element">
                <Link to="/login" className="button-std button-std--violet"> Ви згадали свій пароль?</Link>
                <button className="button-std button-std--violet"> Зареєструватися</button>
            </div>
        </>
    )
}