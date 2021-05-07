import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from '../home/home';
import Users from '../Users';
import Login from '../login/login';
import PrivateRoute from '../../components/PrivateLink';
import './app.scss';
import { AppStateContext } from '../../components/provider';
import LinkCustom from '../../components/Link';
import links from '../../data/links';
import Logs from '../Logs';
import Settings from '../Settings';
import Ocheredi from '../Ocheredi';
import Connectors from '../Connectors';
import NoMatch from '../NoMatch';

function App() {

  const { appState, appSetLogOut } = useContext(AppStateContext);

  return (
    <Router>
      <div className="app">
        {appState.loggedIn &&
          <header className="header">
            <div className="links">
              <LinkCustom data={links} className="links__item"></LinkCustom>
            </div>
            <div className="logout">
              <div className="logout logout__item" onClick={() => appSetLogOut()}>Выйти</div>
            </div>
          </header>
        }
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          <PrivateRoute exact path='/users'>
            <Users />
          </PrivateRoute>
          <PrivateRoute exact path='/'>
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path='/настройки'>
            <Settings />
          </PrivateRoute>
          <PrivateRoute exact path='/logs'>
            <Logs />
          </PrivateRoute>
          <PrivateRoute path='/очереди'>
            <Ocheredi />
          </PrivateRoute>
          <PrivateRoute exact path='/коннекторы'>
            <Connectors />
          </PrivateRoute>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
