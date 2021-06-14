import React from 'react';
import { useSelector } from 'react-redux';
import store from '../../stores/userDataStore/index.jsx';
import { Logo } from '../icons/Icons.jsx';


export default function SingleCV(props) {
  const title = props.title || 'Без назви';
  let titleFromProps = '';
  try {
    titleFromProps = JSON.parse(props.item.cvs).initialValues.cvName;
  } catch (err) {
    titleFromProps = '!';
    console.log(err);
  }
  const ID = props.item.id;
  return (
        <div className="curriculum-vitae">
          <div className="curriculum-vitae__icon">
            <Logo/>
          </div>
          <div className="curriculum-vitae__title text-violet">{titleFromProps}</div>
          {props.noLinks !== true
          && <>
            <div
              onClick={() => {
                store.dispatch({
                  type: 'SET-CV-ID-TO-EDIT',
                  payload: ID,
                });
              }}
              className="curriculum-vitae__button curriculum-vitae__edit-button
              max-content button-std
              button-std--violet small">
                Редагувати
              </div>
            <div className="curriculum-vitae__button curriculum-vitae__pdf-button max-content  button-std button-std--violet small">PDF</div>
          </>
          }

        </div>
  );
}
