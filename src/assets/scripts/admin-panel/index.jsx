import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoginForm from "./components/loginForm/index.jsx";
import store from './stores/userDataStore/index.jsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Cabinet from './components/cabinet/Cabinet.jsx'
console.log(store.getState().isLogined);



function App(props){
  const isLogined = useSelector(state=>state.isLogined);
  console.log(isLogined);
  return (
    isLogined ? <Cabinet isLogined={store.getState().isLogined.toString()}/> : <LoginForm/> 
  )
}
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
, document.querySelector('#root'));