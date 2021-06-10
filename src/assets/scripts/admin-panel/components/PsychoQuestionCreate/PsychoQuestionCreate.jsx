import React from 'react';
import routes from '../../routes/routes.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';
import store from '../../stores/userDataStore/index.jsx';

export default function PsychoQuestionCreate() {
  return (
    <div className="psycho-querstion-create-wrapper">
      <div className="page-title text-violet">Послуги психолога</div>
      <div className="white-bg-element with-padding">
        Кар’єрний хаб пропонує жінкам, постраждалим від домашнього /
        гендерно зумовленого насильства, послуги для покращення 
        професійних навичок та успішного працевлаштування. 
        Фахівці і фахівчині дотримуються індивідуального підходу до 
        оцінки потреб і можливостей кожної жінки та допомагають 
        побудувати персональну стратегію для досягнення вашої мети.
      </div>
      <div className="white-bg-element with-padding social-icons-wrapper">
        <div className="subtitle-small text-violet">
          Взяти участь у онлайн групах підтримки
        </div>
        <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5306 0.5H11.0661C13.2882 0.5 15.0967 2.30856 15.0967 4.5306V11.0661C15.0967 13.2882 13.2882 15.0967 11.0661 15.0967H4.5306C2.30856 15.0967 0.5 13.2882 0.5 11.0661V4.5306C0.5 2.30856 2.30856 0.5 4.5306 0.5Z" stroke="#2A3341"/>
            <path d="M4.09456 7.79853C4.09456 5.75667 5.7565 4.09473 7.79836 4.09473C9.84022 4.09473 11.5022 5.75667 11.5022 7.79853C11.5022 9.84039 9.84022 11.5023 7.79836 11.5023C5.7565 11.5023 4.09456 9.84039 4.09456 7.79853Z" stroke="#2A3341"/>
            <path d="M11.6259 2.9707H11.6292" stroke="#2A3341" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.37516 3.58971H8.79901V1.10983C8.55336 1.07603 7.70854 1 6.72465 1C4.67173 1 3.26542 2.29128 3.26542 4.66458V6.84877H1V9.62109H3.26542V16.5967H6.04294V9.62174H8.21673L8.56181 6.84942H6.04229V4.93947C6.04294 4.13819 6.25869 3.58971 7.37516 3.58971V3.58971Z" stroke="#2A3341"/>
          </svg>
        </a>
      </div>
      <div className="white-bg-element with-padding">
        <div className="blocking-block text-orange">
          <span>
            <Link to={routes.profileEditor}>
              Заповніть профіль&nbsp;
            </Link>
            повністю для доступу до наступних функцій:
          </span>
        </div>
      </div>
    </div>
  );
}
