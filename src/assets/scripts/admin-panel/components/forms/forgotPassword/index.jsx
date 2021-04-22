import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
export default function(props) {
    return (
        <>
            <Link className="button-std button-std--violet" to='/login'>Відновити пароль</Link>
            <div className="white-bg-element">
                <Link to="/login" className="button-std button-std--violet"> Ви згадали свій пароль?</Link>
                <button className="button-std button-std--violet"> Зареєструватися</button>
            </div>
        </>
    )
}