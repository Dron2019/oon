import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoginForm from "./components/loginForm/index.jsx";
import store from './stores/userDataStore/index.jsx';
import { useSelector } from 'react-redux';
import Cabinet from './components/cabinet/Cabinet.jsx';
import ForgotPassword from './components/forms/forgotPassword/index.jsx';
import Register from './components/register/Register.jsx'
import {
  HashRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  hashHistory
} from "react-router-dom";


function App(props){
  const isLogined = useSelector(state=>state);
  console.log(props);
  return (
    <Switch>
      <Route exact path="/">
        {isLogined.isLogined ? 
        <Cabinet isLogined={store.getState().isLogined.toString()}/> : 
        <LoginForm/>}
      </Route>
      <Route path="/register">
        <Register></Register>
      </Route>
      <Route path="/login">
        {isLogined.isLogined ? 
        <Cabinet isLogined={store.getState().isLogined.toString()}/> : 
        <LoginForm/>}
      </Route>
      <Route  path="/cabinet">
        {isLogined.isLogined ? 
        <Cabinet isLogined={store.getState().isLogined.toString()}/> : 
        <LoginForm/>}
      </Route>
      <Route path="/forgot-password">
          <ForgotPassword/>
      </Route>
    </Switch>

  )
}
ReactDOM.render(
  <HashRouter  history={hashHistory} basename="/">
      <Provider store={store}>
        <App/>
      </Provider>
  </HashRouter>
, document.querySelector('#root'));