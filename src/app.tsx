import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch, withRouter, Link} from 'react-router-dom';
import {AppContainer} from './app.styled';
import {RootState} from './duck/types';
import {Login} from './page/login/login';
import {Body} from './page/body/body';
import {Authenticated} from './page/authenticated/authenticated';

const AppComponent: React.FC<RouteComponentProps> = () => {
  const selectIsLoading = (state: RootState) => state.app.isLoading;
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const renderRoutes = () => {
    return (
      <Switch>
        <Route path={'/login'} component={Login} exact />
        <Route path={'/home'} component={Body} exact />
          <Authenticated path={'/home'} component={Body} exact />
          <Redirect exact from="/*" to={{pathname: '/home'}} />
      </Switch>
    ); 
  };
  return (
    <AppContainer>
      {renderRoutes()}
    </AppContainer> 
  );
};

export const App = withRouter(AppComponent);