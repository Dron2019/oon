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
import Page404 from '../404/404.jsx';


import { countNewMessages } from '../../stores/newMessageReducer/actions-newMessageReducer.jsx';
import { getConsultQuestions } from '../../stores/consultQuestionsStore/consult-questions-actions.jsx';
import { getOnlineConsultQuestions } from '../../stores/onlineConsultQuestionsStore/actions_onlineConsultQuestionsStore.jsx';
import { getPsychoQuestions } from '../../stores/psychoQuestionsStore/actions_psychoQuestionsStore.jsx';
import { logout, logoutAsync, checkSession } from '../../stores/userDataStore/actions.jsx';
import CourseLinkInCabinetMenu from '../CourseLinkInCabinetMenu/CourseLinkInCabinetMenu.jsx';

const USER_TYPES = {
  psych: 'psych',
  user: 'user',
  consult: 'consult',
}


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
  const [activeLink, setActiveLink] = useState((
    () => {
      
      if (history.location.pathname === '/' || history.location.pathname === '/cabinet' || history.location.pathname === '/login') {

        console.log('i am in pathname');
        return routes.createConsultQuestion;
      } 
      return location.pathname;
    }
  )());
  const [formReviewViewer, setFormReviewViewer] = useState(false);
  const [wasCheckedSession, setSessionCheckStatus] = useState(0);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const userType = useSelector(state => state.loginStatusReducer.role); /* psycho */
  const ref = useRef(null);

  useEffect(() => history.listen((location) => {
    setMenuVisibility(false);
    setActiveLink((
      () => {
        
        if (history.location.pathname === '/' || history.location.pathname === '/cabinet' || history.location.pathname === '/login') {
  
          console.log('i am in pathname');
          return routes.createConsultQuestion;
        } 
        return location.pathname;
      }
    )());
    window.scrollTo(0, 0);
    // store.dispatch(countNewMessages());
  }), [history]);

  /**Подсветка новых сообщений в кабинете */
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
    if (userType === USER_TYPES.consult && el[2]) return <></>;
    return (
        <li className={isActive} key={index}>
          <Link onClick={() => setActiveLink(el[1])} className={`${isActive} menu__link`} to={el[1]}>
            {el[0]}
          </Link>
          {userType === USER_TYPES.user && <CabinetMessageBell count={el[3] > 0 ? el[3] : 0}/>}
        </li>
    );
  }
  function renderPsychLinks(el, index) {
    /** el[3] - переменная новых сообщений в разделе */
    const isActive = (activeLink === el[1]) ? 'active' : '';
    if (userType === USER_TYPES.consult ) return <></>;
    if (el[2] === true && userType === USER_TYPES.psych) return <></>;
    return (
        <li className={isActive} key={index}>
          <Link onClick={() => setActiveLink(el[1])} className={`${isActive} menu__link`} to={el[1]}>
            {el[0]}
          </Link>
          { userType === USER_TYPES.user && <CabinetMessageBell count={el[3] > 0 ? el[3] : 0}/>}
        </li>
    );
  }

  /**Close on hufe swipe START */
  const moveCords = {
    x: 0,
    swipeDistance: 0,
    locked: true,
    percentForClosing: 50, 
  }
  function swipeTouchEnd(e) {
    if (moveCords.swipeDistance > ref.current.getBoundingClientRect().width * (moveCords.percentForClosing / 100)) {
      setMenuVisibility(false);
    }
    ref.current.style.transform = '';
    moveCords.swipeDistance = 0;
    moveCords.x = 0;
    moveCords.locked = true;
    ref.current.style.transition = '';
  }
  function swipeTouchStart(e){
    moveCords.x = e.changedTouches[0].clientX;
    moveCords.locked = false;
    ref.current.style.transition = 'none';
  }
  function swipeTouchMove (e) {
    if (moveCords.locked === false && e.changedTouches[0].clientX < moveCords.x)  {
      moveCords.swipeDistance = moveCords.x - e.changedTouches[0].clientX;
      ref.current.style.transform = `translateX(-${moveCords.x - e.changedTouches[0].clientX}px)`;
    }
  }
  /**Close on hufe swipe END */
  const menus = [
    ['Створити запитання', routes.createConsultQuestion, true, '', ''],
    ['Історія запитань', routes.questionsHistory, false, newMessages.consult],
    ['Запит на онлайн консультацію', routes.onlineConsultationRequest, true],
    ['Прийняті запити на консультацію', routes.onlineConsultQuestionsHistory, false, newMessages.onlineConsult],
  ];
  const psychoMenus = [
    ['Створити запитання ', routes.psychoQuestionCreate, true, '', USER_TYPES.psych],
    ['Історія запитань ', routes.psychoQuestionHistory, false, newMessages.psycho, USER_TYPES.psych],
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
  /**закрытие меню при клике по внешним елементам */
  const [locked, toggleLocked] = useToggle(false);
  useLockBodyScroll(locked);
  useEffect(() => {
    if (document.documentElement.clientWidth < 576) toggleLocked(menuVisibility);
  }, [menuVisibility]);
  useClickAway(ref, () => {
    if (menuVisibility === true) setMenuVisibility(false);
  }, ['mousedown', 'touchstart']);
  
  /**закрытие меню при клике по внешним елементам END */
  return (
      <div className="cabinet-wrapper">
        <div 
            onTouchMove={swipeTouchMove} 
            onTouchStart={swipeTouchStart} 
            onTouchEnd={swipeTouchEnd}
            className={`menu ${menuVisibility ? 'opened' : ''}`} 
            onClick={handleMobileMenuClick} {...handlers} 
            ref={ref}>
          <div className="menu__subtitle">
            Мій кабінет
          </div>
          {userType !== USER_TYPES.psych && 
            <>
            <div className="menu__dark-block">
              <div
                  // onClick={() => setActiveLink(routes.workConsultation)}
                  to={routes.workConsultation}
                  className={`bold-link text text-white fw-800  ${(activeLink === (routes.workConsultation)) ? 'active' : ''}`}>
                  <span>
                  Послуги кар'єрного консультанта
                  </span>
                </div>
                <ul>
                  {menus.map(renderCabinetLinks)}
                </ul>
              </div>
            </>
          }
          {userType !== USER_TYPES.consult && 
            <>
              <div className="text text-white fw-800 menu-bold-text">
                  Послуги психолога
              </div>
              <ul>
                  {psychoMenus.map(renderPsychLinks)}
              </ul>
            </>
          }
          <Link
            activeClassName="active"
            onClick={() => setActiveLink(routes.profileEditor)}
            to={routes.profileEditor}
            className={`bold-link text text-white fw-800  mt-10 ${(activeLink === (routes.profileEditor)) ? 'active' : ''}`}>
            <span>
            Редагувати профіль
            </span>
          </Link>
          { userType === 'user'
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
          <div className="button-std button-std--white small" onClick={() => setFormReviewViewer(true)}>Зворотній зв'язок</div>
          {userType === USER_TYPES.consult && <CourseLinkInCabinetMenu href="https://google.com" target='_blank'/>}
        </div>
        <div className="content">
          {formReviewViewer && <CabinetReviewForm onClose={() => setFormReviewViewer(false)} />}
          <Switch>
            {cabinetUserRoutes.map(renderCabinetNestedRoutes)}
            <Route>
              <Page404 backLink={() => {
                history.go(-1);
              }}/>
            </Route>
            {/* <Route component={Missing} /> */}
          </Switch>
        </div>
      </div>
  );
}
