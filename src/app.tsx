import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import {AppContainer} from './app.styled';
import {RootState} from './duck/types';
import {Login} from './page/login/login';
import {Authenticated} from './page/authenticated/authenticated';

const AppComponent: React.FC<RouteComponentProps> = () => {
  const selectIsLoading = (state: RootState) => state.app.isLoading;
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const renderRoutes = () => {
    return (
      <Switch>
        <Route path={'/login'} component={Login} exact />
          <Authenticated path={'/home'} component={Login} exact />
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