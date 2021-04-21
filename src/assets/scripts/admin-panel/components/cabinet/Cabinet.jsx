import React from 'react';
import ReactDOM from 'react-dom';
import store from '../../stores/userDataStore/index.jsx';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
    const isLogined = useSelector(state=>state.isLogined)
    console.log(isLogined,'!!!!!');
    const menus = [
      ['Послуги психолога','/psycho'],
      ['Створити запитання','/createQuestion'],
      ['Історія запитань','/questionHistory'],
      ['Запит на онлайн консультацію','/consult-request'],
      ['Прийняті запити на консультацію',''],
      ['Послуги консультанта з пошуку роботи',''],
    ]
    return (
      <Router>
        <div className="menu">
          <div className="link" onClick={()=>{store.dispatch({type:'LOGOUT'})}}>
            Вийти: {isLogined.toString()}
          </div>
          <ul>
            {menus.map((el, index)=><Link to={el[1]}>{el[0]}</Link>)}
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route path="/psycho">
              <About />
            </Route>
            <Route path="/createQuestion">
              <Users />
            </Route>
            <Route path="/questionHistory">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
  

