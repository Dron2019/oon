/* eslint-disable no-shadow */
/* eslint-disable import/no-duplicates */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { useClickAway, useLockBodyScroll, useToggle } from 'react-use';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import store from '../../stores/userDataStore/index.jsx';

import cabinetUserRoutes from '../../routes/cabinetUserRoutes.jsx';
import routes from '../../routes/routes.jsx';


import dataStore from '../../stores/userDataStore/index.jsx';
import CabinetMessageBell from '../cabinet-message-bell/CabinetMessageBell.jsx';
import CabinetReviewForm from '../cabinet-review-form/CabinetReviewForm.jsx';

import { countNewMessages } from '../../stores/newMessageReducer/actions-newMessageReducer.jsx';
import { getConsultQuestions } from '../../stores/consultQuestionsStore/consult-questions-actions.jsx';
import { getOnlineConsultQuestions } from '../../stores/onlineConsultQuestionsStore/actions_onlineConsultQuestionsStore.jsx';
import { getPsychoQuestions } from '../../stores/psychoQuestionsStore/actions_psychoQuestionsStore.jsx';
import { logout, logoutAsync, checkSession } from '../../stores/userDataStore/actions.jsx';
import CourseLinkInCabinetMenu from '../CourseLinkInCabinetMenu/CourseLinkInCabinetMenu.jsx';

export default function Cabinet(props) {
  const isLogined = useSelector(state => state.isLogined);
  const userName = useSelector(state => state.loginStatusReducer.name) || '';
  const newMessages = useSelector(state => state.newMessagesReducer);

  const messagesList = useSelector(state => state.consultQuestionsStore);
  const onlineConsultMessagesList = useSelector(state => state.onlineConsultQuestionsStore);
  const psychoMessagesList = useSelector(state => state.psychoQuestionsStore);

  // const test = true;
  const history = useHistory();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(useLocation().pathname);
  const [formReviewViewer, setFormReviewViewer] = useState(false);
  const [wasCheckedSession, setSessionCheckStatus] = useState(0);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const userType = useSelector(state => state.loginStatusReducer.role); /* psycho */
  const ref = useRef(null);

  useEffect(() => history.listen((location) => {
    setMenuVisibility(false);
    setActiveLink(location.pathname);
    // store.dispatch(countNewMessages());
  }), [history]);
  useEffect(() => {
    dataStore.dispatch(checkSession());
    store.dispatch(getConsultQuestions());
    store.dispatch(getOnlineConsultQuestions());
    store.dispatch(getPsychoQuestions());
  }, []);
  useEffect(() => {
    setTimeout(() => {
      store.dispatch(countNewMessages());
    }, 100);
  }, [messagesList, onlineConsultMessagesList, psychoMessagesList]);

  function renderCabinetNestedRoutes(el, index) {
    return (
        <Route exact={el.exact} key={index} path={el.route}>
          {el.component}
        </Route>
    );
  }
  function renderCabinetLinks(el, index) {
    /** el[3] - переменная новых сообщений в разделе */
    const isActive = (activeLink === el[1]) ? 'active' : '';
    if (userType === 'consult' && el[2]) return <></>;
    return (
        <li className={isActive} key={index}>
          <Link onClick={() => setActiveLink(el[1])} className={`${isActive} menu__link`} to={el[1]}>
            {el[0]}
          </Link>
          <CabinetMessageBell count={el[3] > 0 ? el[3] : 0}/>
        </li>
    );
  }

  const menus = [
    ['Створити запитання', routes.createConsultQuestion, true],
    ['Історія запитань', routes.questionsHistory, false, newMessages.consult],
    ['Запит на онлайн консультацію', routes.onlineConsultationRequest, true],
    ['Прийняті запити на консультацію', routes.onlineConsultQuestionsHistory, false, newMessages.onlineConsult],
  ];
  const psychoMenus = [
    ['Створити запитання ', routes.psychoQuestionCreate, true],
    ['Історія запитань ', routes.psychoQuestionHistory, false, newMessages.psycho],
  ];
  function handleMobileMenuClick(evt) {
    if (evt.target.classList.contains('menu')) {
      setMenuVisibility(!menuVisibility);
    }
  }
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setMenuVisibility(false);
    },
    delta: 80,

  });

  const [locked, toggleLocked] = useToggle(false);
  useLockBodyScroll(locked);
  useEffect(() => {
    if (document.documentElement.clientWidth < 576) toggleLocked(menuVisibility);
  }, [menuVisibility]);
  useClickAway(ref, () => {
    if (menuVisibility === true) setMenuVisibility(false);
  }, ['mousedown', 'touchstart']);

  return (
      <div className="cabinet-wrapper">
        <div className={`menu ${menuVisibility ? 'opened' : ''}`} onClick={handleMobileMenuClick} {...handlers} ref={ref}>
          <div className="menu__subtitle">
            Мій кабінет
          </div>
          <div className="menu__dark-block">
          <div
              // onClick={() => setActiveLink(routes.workConsultation)}
              to={routes.workConsultation}
              className={`bold-link text text-white fw-800  ${(activeLink === (routes.workConsultation)) ? 'active' : ''}`}>
              <span>
              Послуги консультанта  з пошуку роботи
              </span>
            </div>
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
            activeClassName="active"
            onClick={() => setActiveLink(routes.profileEditor)}
            to={routes.profileEditor}
            className={`bold-link text text-white fw-800  mt-10 ${(activeLink === (routes.profileEditor)) ? 'active' : ''}`}>
            <span>
            Редагувати профіль
            </span>
          </Link>
          { userType !== 'consult'
          && <>
              <Link
                activeClassName="active"
                onClick={() => setActiveLink(routes.CreateCV)}
                to={routes.CreateCV}
                className={`bold-link text text-white fw-800  mt-10 ${(activeLink === (routes.CreateCV)) ? 'active' : ''}`}>
                <span>
                  Створити резюме
                </span>
              </Link>
              <Link
                activeClassName="active"
                onClick={() => setActiveLink(routes.userCV)}
                to={routes.userCV}
                className={`bold-link text text-white fw-800  mt-10 ${(activeLink === (routes.userCV)) ? 'active' : ''}`}>
                <span>
                  Мої резюме
                </span>
              </Link>
          </>
          }
          <Link
            activeClassName="active"
            onClick={() => setActiveLink(routes.FAQ)}
            to={routes.FAQ}
            className={`bold-link text text-white fw-800  mt-10 ${(activeLink === (routes.FAQ)) ? 'active' : ''}`}>
            <span>
              Часті запитання (FAQ)
            </span>
          </Link>
          {/* <div className="text text-white fw-800 menu-bold-text with-vert-line">

          </div> */}
          {/* <div className="button-std button-std--violet quit-button"
            onClick={(evt) => { store.dispatch(logoutAsync(evt.target.innerText)); }}>
            Вихід з кабінету
          </div> */}
          <div className="button-std button-std--white small" onClick={() => setFormReviewViewer(true)}>Звортній зв'язок</div>
          <CourseLinkInCabinetMenu href="https://goodle.com" target='_blank'/>
        </div>
        <div className="content">
          {formReviewViewer && <CabinetReviewForm onClose={() => setFormReviewViewer(false)} />}
          <Switch>
            {cabinetUserRoutes.map(renderCabinetNestedRoutes)}
            <Route>
              <div className="page-title text-violet">Сторінка не знайдена</div>
            </Route>
            {/* <Route component={Missing} /> */}
          </Switch>
        </div>
      </div>
  );
}
