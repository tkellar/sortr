import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authenticationService from '../services/AuthenticationService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PrivateRoute({ component: Component, path }: { component: React.ComponentType<any>, path: string }): JSX.Element {
  return (
    <Route path={path} render={(props) => {
      const currentUser = authenticationService.currentUserValue;
      if (!currentUser) {
        return <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
      }

      return <Component {...props} />
    }} />
  );
}

export default PrivateRoute;
