import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {RootState} from '../../duck/types';
import Button from '@material-ui/core/Button';
import {isLogoutAction} from '../../duck/app/actions';
import {Header} from '../header/header';

export const Body: React.FC = ({}) => {
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);
  const dispatch = useDispatch();

  return (
      <div>
        <Header />
      </div>
  )
}