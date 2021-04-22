import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoginForm from "./components/loginForm/index.jsx";
import store from './stores/userDataStore/index.jsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Cabinet from './components/cabinet/Cabinet.jsx';
import {
  HashRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App(props){
  const isLogined = useSelector(state=>state);
  return (
    isLogined.isLogined ? 
    <Cabinet isLogined={store.getState().isLogined.toString()}/> : 
    <LoginForm/>

  )
}
ReactDOM.render(
  <HashRouter  basename="/">
      <Provider store={store}>
        <App/>
      </Provider>
  </HashRouter>
, document.querySelector('#root'));