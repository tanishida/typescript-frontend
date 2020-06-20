import React from 'react';
import {useSelector} from 'react-redux';
import {RouteProps} from 'react-router';
import {Redirect, Route} from 'react-router-dom';
import {RootState} from '../../duck/types';

export const Authenticated: React.FC<RouteProps> = ({...children}) => {
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);

  switch (true) {
    case appReducer.isLogin:
      return <Route {...children} />;
    default:
      return <Redirect to={'/login'} />;
  }
};