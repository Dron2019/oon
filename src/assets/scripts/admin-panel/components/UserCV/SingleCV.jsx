import React from 'react';
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
  return (
        <div className="curriculum-vitae">
          <div className="curriculum-vitae__icon">
            <Logo/>
          </div>
          <div className="curriculum-vitae__title text-violet">{titleFromProps}</div>
          {props.noLinks !== true
          && <>
            <div className="curriculum-vitae__button curriculum-vitae__edit-button  max-content button-std button-std--violet small">Редагувати</div>
            <div className="curriculum-vitae__button curriculum-vitae__pdf-button max-content  button-std button-std--violet small">PDF</div>
          </>
          }

        </div>
  );
}
