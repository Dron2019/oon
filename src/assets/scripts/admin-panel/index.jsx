import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import {
  HashRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  hashHistory,
  useHistory,
} from 'react-router-dom';
import LoginForm from './components/loginForm/index.jsx';
// import store from './stores/userDataStore/index.jsx';

import Cabinet from './components/cabinet/Cabinet.jsx';
import ForgotPassword from './components/forms/forgotPassword/index.jsx';
import Register from './components/register/Register.jsx';
import routes from './routes/routes.jsx';
import dataStore from './stores/userDataStore/index.jsx';
import { checkSession } from './stores/userDataStore/actions.jsx';

function App(props) {
  const isLogined = useSelector(state => state.loginStatusReducer.isLogined);
  // isLogined ? useHistory().push(routes.cabinet) : null;
  // isLogined ? hashHistory().push('/cabinet');
  // useEffect(() => {
  //   dataStore.dispatch(checkSession());
  // }, []);
  return (
    <Switch>
      <Route exact path={routes.home}>
        {isLogined
          ? <Cabinet isLogined={isLogined}/>
          : <LoginForm/>}
        {/* <LoginForm/> */}
      </Route>
      <Route path={routes.register}>
        <Register></Register>
      </Route>
      <Route path={routes.login}>
        {isLogined
          ? <Cabinet isLogined={isLogined}/>
          : <LoginForm/>}
        {/* <LoginForm/> */}
      </Route>
      <Route path={routes.cabinet}>
        {isLogined
          ? <Cabinet isLogined={isLogined}/>
          : <LoginForm/>}
        {/* <Cabinet isLogined={store.getState().isLogined.toString()}/> */}
      </Route>
      <Route path={routes.forgotPassword}>
          <ForgotPassword/>
      </Route>
    </Switch>

  );
}
ReactDOM.render(
  <HashRouter history={hashHistory} basename="/">
      <Provider store={dataStore}>
        <App/>
      </Provider>
  </HashRouter>,
  document.querySelector('#root'),
);
