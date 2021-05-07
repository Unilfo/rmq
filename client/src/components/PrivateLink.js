import React, { useContext } from 'react';
import { AppStateContext } from './provider';
import {
  Route,
  Redirect
} from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const { appState } = useContext(AppStateContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        appState.loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
