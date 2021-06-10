/* eslint-disable no-shadow */
/* eslint-disable import/no-duplicates */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
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


import cabinetUserRoutes from '../../routes/cabinetUserRoutes.jsx';
import routes from '../../routes/routes.jsx';


import dataStore from '../../stores/userDataStore/index.jsx';
import CabinetMessageBell from '../cabinet-message-bell/CabinetMessageBell.jsx';
import WorkConsultation from '../work-consultation/WorkConsultation.jsx';
import CreateConsultQuestion from '../create-consult-question/CreateConsultQuestion.jsx';
import QuestionsHistory from '../questions-history/QuestionsHistory.jsx';
import OnlineConsultationRequest from '../online-consultation-request/OnlineConsultationRequest.jsx';
import { logout, logoutAsync, checkSession } from '../../stores/userDataStore/actions.jsx';

export default function Cabinet(props) {
  const isLogined = useSelector(state => state.isLogined);
  const userName = useSelector(state => state.loginStatusReducer.name) || '';
  // const test = true;
  const history = useHistory();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(useLocation().pathname);
  const [wasCheckedSession, setSessionCheckStatus] = useState(0);
  const [menuVisibility, setMenuVisibility] = useState(false);
  // setActiveLink(location.pathname);
  useEffect(() => history.listen((location) => {
    setMenuVisibility(false);
    setActiveLink(location.pathname);
  }), [history]);
  const parentUrlPart = '/cabinet';

  function renderCabinetNestedRoutes(el, index) {
    return (
        <Route exact={el.exact ? 'exact' : ''} key={index} path={el.route}>
          {el.component}
        </Route>
    );
  }
  function renderCabinetLinks(el, index) {
    const isActive = (activeLink === el[1]) ? 'active' : '';
    return (
        <li className={isActive} key={index}>
          <Link onClick={() => setActiveLink(el[1])} className={`${isActive} menu__link`} to={el[1]}>
            {el[0]}
          </Link>
          <CabinetMessageBell count={index}/>
        </li>
    );
  }

  const menus = [
    ['Створити запитання', routes.createConsultQuestion],
    ['Історія запитань', routes.questionsHistory],
    ['Запит на онлайн консультацію', routes.onlineConsultationRequest],
    ['Прийняті запити на консультацію', routes.cabinet],
  ];
  const psychoMenus = [
    ['Створити запитання ', '/cabinet/create-psycho-question'],
    ['Історія запитань ', '/cabinet/ '],
  ];
  function handleMobileMenuClick(evt) {
    console.log(evt);
    if (evt.target.classList.contains('menu')) {
      setMenuVisibility(!menuVisibility);
    }
  }
  return (
      <div className="cabinet-wrapper">
        <div className={`menu ${menuVisibility ? 'opened' : ''}`} onClick={handleMobileMenuClick}>
          <div className="menu__subtitle">
            Мій кабінет
          </div>
          <div className="menu__dark-block">
            <Link
              onClick={() => setActiveLink(routes.workConsultation)}
              to={routes.workConsultation}
              className={`bold-link text text-white fw-800  ${(activeLink === (routes.workConsultation)) ? 'active' : ''}`}>
              <span>
              Послуги консультанта  з пошуку роботи
              </span>
            </Link>
            <ul>
              {menus.map(renderCabinetLinks)}
            </ul>
          </div>
          <div className="text text-white fw-800 menu-bold-text">
              Послуги психолога
          </div>
          <ul>
              {psychoMenus.map(renderCabinetLinks)}
          </ul>
          <Link
            onClick={() => setActiveLink(routes.profileEditor)}
            to={routes.profileEditor}
            className={`bold-link text text-white fw-800  mt-10 ${(activeLink === (routes.profileEditor)) ? 'active' : ''}`}>
            <span>
            Редагувати профіль
            </span>
          </Link>
          <Link
            onClick={() => setActiveLink(routes.CreateCV)}
            to={routes.CreateCV}
            className={`bold-link text text-white fw-800  mt-10 ${(activeLink === (routes.CreateCV)) ? 'active' : ''}`}>
            <span>
              Створити резюме
            </span>
          </Link>
          <Link
            onClick={() => setActiveLink(routes.userCV)}
            to={routes.userCV}
            className={`bold-link text text-white fw-800  mt-10 ${(activeLink === (routes.userCV)) ? 'active' : ''}`}>
            <span>
              Мої резюме
            </span>
          </Link>
          <Link
            onClick={() => setActiveLink(routes.FAQ)}
            to={routes.FAQ}
            className={`bold-link text text-white fw-800  mt-10 ${(activeLink === (routes.FAQ)) ? 'active' : ''}`}>
            <span>
              Часті запитання (FAQ)
            </span>
          </Link>
          {/* <div className="text text-white fw-800 menu-bold-text with-vert-line">

          </div> */}
          <div className="button-std button-std--white quit-button"
            onClick={(evt) => { store.dispatch(logoutAsync(evt.target.innerText)); }}>
            Вийти: {userName.toString()}
          </div>
          <div className="button-std button-std--white small">Звортній зв'язок</div>
        </div>
        <div className="content">
          <Switch>
            {cabinetUserRoutes.map(renderCabinetNestedRoutes)}
          </Switch>
        </div>
      </div>
  );
}
