import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import routes from '../../routes/routes.jsx';

import EmptyCV from '../EmptyCV/EmptyCV.jsx';
import store from '../../stores/userDataStore/index.jsx';
import { getCV } from '../../stores/CVStore/cv-actions.jsx';
import SingleCV from './SingleCV.jsx';

function getCVs() {
  
}

/* Изменить ссылку, когда будет создан компонент "Создать резюме" */
export default function UserCV(props) {
  const [cvs, setCV] = useState([]);
  const CVs = useSelector(state=> state.cvReducer);
  useEffect(() => {
    store.dispatch(getCV());
  }, []);
  return (
    <div className="user-cv-wrapper">
        <div className="page-title text-violet">Мої резюме</div>
        {CVs.length === 0 ? <EmptyCV/> : <ListCV items={CVs}/>}
    </div>

  );
}


function ListCV(props) {
  return (
        <div className="white-bg-element cv-list">
            <div className="subtitle-small text-violet">Мої резюме:</div>
            {props.items.map(item => <SingleCV item={item} title={item.title}/>)}
        </div>
  );
}

