import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes/routes.jsx';
import { Logo } from '../icons/Icons.jsx';

/* Изменить ссылку, когда будет создан компонент "Создать резюме" */
export default function UserCV(props) {
  console.log(routes);
  return (
    <div className="user-cv-wrapper">
        <div className="page-title text-violet">Мої резюме</div>
        <EmptyCV/>
        <ListCV/>
    </div>

  );
}

function EmptyCV(props) {
  return (
        <div className="white-bg-element">
            <div className="subtitle-small text-violet">Мої резюме:</div>
            <p>
                У вас ще не створено жодногу резюме. Щоб створити резюме,
                <Link className="text-violet" to={routes.FAQ}>
                    заповніть форму “створити нове резюме” та натисніть “зберегти резюме”.
                </Link>
                Резюме створиться автоматично
            </p>
        </div>
  );
}

function ListCV(props) {
  return (
        <div className="white-bg-element">
            <div className="subtitle-small text-violet">Мої резюме:</div>
            <SingleCV/>
        </div>
  );
}

function SingleCV(props) {
  return (
        <div className="curriculum-vitae">
          <div className="curriculum-vitae__icon">
            <Logo/>
          </div>
          <div className="curriculum-vitae__title text-violet">Шаблон “Вчительки молодших класів”</div>
          <div className="curriculum-vitae__button curriculum-vitae__edit-button  max-content button-std button-std--violet small">Редагувати</div>
          <div className="curriculum-vitae__button curriculum-vitae__pdf-button max-content  button-std button-std--violet small">PDF</div>
        </div>
  );
}
