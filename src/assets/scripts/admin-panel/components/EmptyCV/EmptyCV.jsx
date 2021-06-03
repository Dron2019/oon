import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes/routes.jsx';
 
export default function EmptyCV(props) {
  return (
        <div className="white-bg-element empty-cv-block">
            <div className="subtitle-small text-violet">Мої резюме:</div>
            <p>
                У вас ще не створено жодного резюме. Щоб створити резюме,
                <Link className="text-violet" to={routes.FAQ}>
                    заповніть форму “створити нове резюме” та натисніть “зберегти резюме”.
                </Link>
                Резюме створиться автоматично
            </p>
        </div>
  );
}