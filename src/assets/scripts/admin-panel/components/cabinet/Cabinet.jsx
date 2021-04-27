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
import {logout} from '../../stores/userDataStore/actions.jsx';

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
    const userName = useSelector(state=>state.isSome) || '';
    const test = true;
    const history = useHistory();
    console.log(useHistory);
    const [activeLink, setActiveLink] = useState('');
    const parentUrlPart = '/cabinet';

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
      return <li key={index}><Link onClick={()=>setActiveLink(el[0])}  className={isActive + ' menu__link'} to={el[1]}>{el[0]}</Link></li>
    }
    const nestedElements = [
      {route:'/psycho',component: About()},
      {route:'/createHistory',component: Home()},
      {route:'/createQuestion',component: Users()},
    ];
    const menus = [
      ['Послуги психолога','/cabinet/psycho'],
      ['Створити запитання','/cabinet/createQuestion'],
      ['Історія запитань','/cabinet/questionHistory'],
      ['Запит на онлайн консультацію','/cabinet/consult-request'],
      ['Прийняті запити на консультацію','/cabinet'],
      ['Послуги консультанта з пошуку роботи','/cabinet'],
    ]
    return (
      <>
        <div className="menu">
          <div className="menu__subtitle">
            Мій кабінет
          </div>
          <div className="button-std button-std--violet" 
            onClick={()=>{store.dispatch(logout())}}>
            Вийти: {userName.toString()}
          </div>
          <ul>
            {menus.map(renderCabinetLinks)}
          </ul>
        </div>
        <div className="content">
          <Switch>
            {nestedElements.map(renderCabinetNestedRoutes)}
          </Switch>
        </div>
      </>
    )
  }
  

