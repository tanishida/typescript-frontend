import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import {RootState} from './duck/types';
import {Login} from './page/login/login';
import {Body} from './page/body/body';
import {Authenticated} from './page/authenticated/authenticated';

const AppComponent: React.FC<RouteComponentProps> = () => {
  const selectIsLoading = (state: RootState) => state.app.isLoading;
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  return (
    <Switch>
      <Route path={'/login'} component={Login} exact />
        <Authenticated path={'/home'} component={Body} exact />
        <Redirect exact from="/*" to={'/home'} />
    </Switch>
  );
};

export const App = withRouter(AppComponent);