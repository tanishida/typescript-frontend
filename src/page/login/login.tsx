import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import {RootState} from '../../duck/types';

export const Login: React.FC = ({}) => {
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (appReducer.isLogin) {
      location.href = '/home';
    } 
  }, [appReducer.isLogin]);

  const onLogin = (values: any) => {
    // dispatch(loginAction(values));
  };

  if (appReducer.isLogin) {
    return null;
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
         />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={3} />
      <Grid item xs={6}>
        <TextField 
          label="ログインID"
          type="search"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={3} />
    </Grid>
  )
}