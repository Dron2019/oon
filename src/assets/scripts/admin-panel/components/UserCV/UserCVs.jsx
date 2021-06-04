import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes/routes.jsx';
import { Logo } from '../icons/Icons.jsx';

import EmptyCV from '../EmptyCV/EmptyCV.jsx';

function getCVs() {
  return [
    // { title: 'Шаблон “Вчительки молодших класів”', id: 0 },
    // { title: 'Манікюрщиця', id: 0 },
    // { title: 'Кухарка', id: 0 },
    // { title: 'Офіціант', id: 0 },
    // { title: 'Модель', id: 0 },
    // { title: 'SMM-менеджер', id: 0 },
    // { title: 'SMM-менеджер', id: 0 },
    // { title: 'SMM-менеджер', id: 0 },
    // { title: 'SMM-менеджер', id: 0 },
    // { title: 'SMM-менеджер', id: 0 },
    // { title: 'SMM-менеджер', id: 0 },
    // { title: 'SMM-менеджер', id: 0 },
    // { title: 'SMM-менеджер', id: 0 },
  ];
}

/* Изменить ссылку, когда будет создан компонент "Создать резюме" */
export default function UserCV(props) {
  const [cvs, setCV] = useState(getCVs());

  return (
    <div className="user-cv-wrapper">
        <div className="page-title text-violet">Мої резюме</div>
        {cvs.length === 0 ? <EmptyCV/> : <ListCV items={cvs}/>}
    </div>

  );
}


function ListCV(props) {
  return (
        <div className="white-bg-element cv-list">
            <div className="subtitle-small text-violet">Мої резюме:</div>
            {props.items.map(item => <SingleCV title={item.title}/>)}
        </div>
  );
}

function SingleCV(props) {
  const title = props.title || 'Без назви';
  return (
        <div className="curriculum-vitae">
          <div className="curriculum-vitae__icon">
            <Logo/>
          </div>
          <div className="curriculum-vitae__title text-violet">{title}</div>
          <div className="curriculum-vitae__button curriculum-vitae__edit-button  max-content button-std button-std--violet small">Редагувати</div>
          <div className="curriculum-vitae__button curriculum-vitae__pdf-button max-content  button-std button-std--violet small">PDF</div>
        </div>
  );
}
