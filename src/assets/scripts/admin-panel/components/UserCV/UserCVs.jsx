import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import routes from '../../routes/routes.jsx';

import { setCvIdToEdit, getCV } from '../../stores/CVStore/cv-actions.jsx';
import EmptyCV from '../EmptyCV/EmptyCV.jsx';
import store from '../../stores/userDataStore/index.jsx';
import SingleCV from './SingleCV.jsx';
import EditCV from '../EditCV/EditCV.jsx';
import Loader from '../loader/loader.jsx';

/* Изменить ссылку, когда будет создан компонент "Создать резюме" */
export default function UserCV(props) {
  const [cvs, setCV] = useState([]);
  const CVs = useSelector(state => state.cvReducer);
  const cvToEditStore = useSelector(state => state.cvToEditStore);
  const isPending = useSelector(state => state.pendingStatusStore);
  useEffect(() => {
    store.dispatch(getCV());
    store.dispatch(setCvIdToEdit(null));
  }, []);
  return (
    <div className="user-cv-wrapper">
        {isPending && <Loader/>}
        {!cvToEditStore && <div className="page-title text-violet">Мої резюме</div>}
        {CVs.length === 0 ? <EmptyCV/> : !cvToEditStore && <ListCV items={CVs}/>}
        {cvToEditStore !== 0 && cvToEditStore !== null && <EditCV/>}
    </div>

  );
}

function ListCV(props) {
  return (
        <div className="white-bg-element cv-list">
            <div className="subtitle-small text-violet">Мої резюме:</div>
          {props.items.map((item, index) => <SingleCV key={index} item={item} title={item.title}/>)}
        </div>
  );
}
