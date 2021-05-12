import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import store from '../../stores/userDataStore/index.jsx';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";



import cabinetUserRoutes from '../../routes/cabinetUserRoutes.jsx';
import dataStore from '../../stores/userDataStore/index.jsx';
import CabinetMessageBell from '../cabinet-message-bell/CabinetMessageBell.jsx';
import WorkConsultation from '../work-consultation/WorkConsultation.jsx';
import CreateConsultQuestion from '../create-consult-question/CreateConsultQuestion.jsx';
import QuestionsHistory from '../questions-history/QuestionsHistory.jsx';
import OnlineConsultationRequest from '../online-consultation-request/OnlineConsultationRequest.jsx';
import {logout, logoutAsync, checkSession} from '../../stores/userDataStore/actions.jsx';

export default function Cabinet(props){
    const isLogined = useSelector(state=>state.isLogined);
    const userName = useSelector(state=>state.loginStatusReducer.name) || '';
    // const test = true;
    const history = useHistory();
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(useLocation().pathname);
    const [wasCheckedSession, setSessionCheckStatus] = useState(0); 
    // setActiveLink(location.pathname);
    useEffect(() => {
      return history.listen((location) => { 
        console.log(`You changed the page to: ${location.pathname}`);
        setActiveLink(location.pathname);
      }) 
    },[history])
    const parentUrlPart = '/cabinet';

    function renderCabinetNestedRoutes(el,index){
      return (
        <Route key={index} path={el.route}>
          {el.component}
        </Route>
      )
    }
    function renderCabinetLinks(el,index){
      const isActive = (activeLink === el[1]) ? 'active' : '';
      return (
        <li className={isActive} key={index}>
          <Link onClick={()=>setActiveLink(el[1])}  className={isActive + ' menu__link'} to={el[1]}>
            {el[0]}
          </Link>
          <CabinetMessageBell count={index}/>
        </li>
      )
    };

    const menus = [
      ['Створити запитання','/cabinet/createConsultQuestion'],
      ['Історія запитань','/cabinet/questionsHistory'],
      ['Запит на онлайн консультацію','/cabinet/onlineConsultationRequest'],
      ['Прийняті запити на консультацію','/cabinet'],
    ];
    const psychoMenus = [
      ['Створити запитання ','/cabinet/create-psycho-question'],
      ['Історія запитань ','/cabinet/ '],
    ]
    return (
      <div className="cabinet-wrapper">
        <div className="menu">
          <div className="menu__subtitle">
            Мій кабінет
          </div>
          <div className="menu__dark-block">
            <Link  
              onClick={()=>setActiveLink(parentUrlPart+'/work-consultation')} 
              to={parentUrlPart+'/work-consultation'} 
              className={'bold-link text text-white fw-800  ' + ((activeLink === ('/cabinet/work-consultation')) ? 'active' : '')}>
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
            onClick={()=>setActiveLink(parentUrlPart+'/profileEditor')} 
            to={parentUrlPart+'/profileEditor'} 
            className={'bold-link text text-white fw-800  mt-10 ' + ((activeLink === ('/cabinet/profileEditor')) ? 'active' : '')}>
            <span>
            Редагувати профіль
            </span> 
          </Link>
          <div className="text text-white fw-800 menu-bold-text with-vert-line">
            Створити резюме
          </div>
          <div className="text text-white fw-800 menu-bold-text with-vert-line">
            Мої резюме
          </div>
          <div className="text text-white fw-800 menu-bold-text with-vert-line">
            Часті запитання (FAQ)
          </div>
          <div className="button-std button-std--white quit-button" 
            onClick={(evt)=>{store.dispatch(logoutAsync(evt.target.innerText))}}>
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
    )
  }
  

