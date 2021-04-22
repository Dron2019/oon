import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoginForm from "./components/loginForm/index.jsx";
import store from './stores/userDataStore/index.jsx';
import { useSelector } from 'react-redux';
import Cabinet from './components/cabinet/Cabinet.jsx';
import ForgotPassword from './components/forms/forgotPassword/index.jsx';
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
    <Switch>
      <Route exact path="/login">
        {isLogined.isLogined ? 
        <Cabinet isLogined={store.getState().isLogined.toString()}/> : 
        <LoginForm/>}
      </Route>
      <Route exact path="/">
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
  <HashRouter  basename="/">
      <Provider store={store}>
        <App/>
      </Provider>
  </HashRouter>
, document.querySelector('#root'));