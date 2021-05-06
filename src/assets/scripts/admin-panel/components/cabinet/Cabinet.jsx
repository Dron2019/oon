import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import store from '../../stores/userDataStore/index.jsx';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory
} from "react-router-dom";

import CabinetMessageBell from '../cabinet-message-bell/CabinetMessageBell.jsx'
import {logout, logoutAsync} from '../../stores/userDataStore/actions.jsx';

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}




export default function Cabinet(props){
    const isLogined = useSelector(state=>state.isLogined);
    const userName = useSelector(state=>state.loginStatusReducer.name) || '';
    const test = true;
    const history = useHistory();
    const [activeLink, setActiveLink] = useState('');
    const parentUrlPart = '/cabinet';
    // history.location.pathname!==parentUrlPart  ? history.push(parentUrlPart) : null;
    if (!test) history.push('/');
    function renderCabinetNestedRoutes(el,index){
      return (
        <Route key={index} path={parentUrlPart+el.route}>
          {el.component}
        </Route>
      )
    }
    function renderCabinetLinks(el,index){
      const isActive = (activeLink === el[0]) ? 'active' : ''; 
      return (
        <li className={isActive} key={index}>
          <Link onClick={()=>setActiveLink(el[0])}  className={isActive + ' menu__link'} to={el[1]}>
            {el[0]}
            <CabinetMessageBell count={index}/>
          </Link>
        </li>
      )
    }
    const nestedElements = [
      {route:'/psycho',component: About()},
      {route:'/createHistory',component: Home()},
      {route:'/createQuestion',component: Users()},
    ];
    const menus = [
      // ['Послуги психолога','/cabinet/psycho'],
      ['Створити запитання','/cabinet/createQuestion'],
      ['Історія запитань','/cabinet/questionHistory'],
      ['Запит на онлайн консультацію','/cabinet/consult-request'],
      ['Прийняті запити на консультацію','/cabinet'],
      // ['Послуги консультанта з пошуку роботи','/cabinet'],
    ];
    const psychoMenus = [
      ['Створити запитання ','/cabinet/create-psycho-question'],
      ['Історія запитань ','/cabinet/psycho-question-history'],
    ]
    return (
      <div className="cabinet-wrapper">
        <div className="menu">
          <div className="menu__subtitle">
            Мій кабінет
          </div>
          <div className="menu__dark-block">
            <div className="text text-white fw-800 menu-bold-text">
              Послуги консультанта  з пошуку роботи
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
          <div className="text text-white fw-800 menu-bold-text with-vert-line mt-10">
            Редагувати профіль
          </div>
          <div className="text text-white fw-800 menu-bold-text with-vert-line">
            Створити резюме
          </div>
          <div className="text text-white fw-800 menu-bold-text with-vert-line">
            Мої резюме
          </div>
          <div className="text text-white fw-800 menu-bold-text with-vert-line">
            Часті запитання (FAQ)
          </div>
          <div className="button-std button-std--white small" 
            onClick={(evt)=>{store.dispatch(logoutAsync(evt.target.innerText))}}>
            Вийти: {userName.toString()}
          </div>
          <div className="button-std button-std--white small">Звортній зв'язок</div>
        </div>
        <div className="content">
          <Switch>
            {nestedElements.map(renderCabinetNestedRoutes)}
          </Switch>
        </div>
      </div>
    )
  }
  

