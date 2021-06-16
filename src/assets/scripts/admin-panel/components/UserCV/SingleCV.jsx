import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import store from '../../stores/userDataStore/index.jsx';
import { Logo, CloseIcon } from '../icons/Icons.jsx';
import { setCvIdToEdit, sendPdfRequest, deleteSingleCV } from '../../stores/CVStore/cv-actions.jsx';

export default function SingleCV(props) {
  const title = props.title || 'Без назви';
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  let titleFromProps = '';
  try {
    titleFromProps = JSON.parse(props.item.cvs).initialValues.cvName;
  } catch (err) {
    titleFromProps = '!';
  }
  const ID = props.item.id;

  return (
        <div key={props.key1 || ''}
          className="curriculum-vitae"
          onMouseLeave={() => setDeleteModalShow(false)}
        >
          {deleteModalShow && (
            <div className="delete-cv-accept-block">
              <span>Ви підтверджуєте видалення резюме?</span>
              <button onClick={() => store.dispatch(deleteSingleCV(ID))}>Так</button>
              <button onClick={() => setDeleteModalShow(false)}>Ні</button>
            </div>
          )}
          <CloseIcon onClick={() => setDeleteModalShow(!deleteModalShow)} className="cv-delete-icon" fill='var(--color-violet)'/>
          <div
            style={{
              filter: `blur(${Number(deleteModalShow)}px)`,
            }}
            className="curriculum-vitae__icon">
            <Logo/>
          </div>
          <div style={{
            filter: `blur(${Number(deleteModalShow)}px)`,
          }} className="curriculum-vitae__title text-violet">{titleFromProps}</div>
          {props.noLinks !== true
          && <>
            <div
              onClick={() => {
                store.dispatch(setCvIdToEdit(ID));
              }}
              className="curriculum-vitae__button curriculum-vitae__edit-button
              max-content button-std
              button-std--violet small">
                Редагувати
              </div>
            <div
              onClick={() => {
                store.dispatch(sendPdfRequest(ID));
              }}
              className="curriculum-vitae__button
              curriculum-vitae__pdf-button max-content
              button-std button-std--violet small">PDF</div>
          </>
          }

        </div>
  );
}
