import React, {useEffect} from 'react';
import clsx from "clsx";
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import {RootState} from '../../duck/types';
import {ColorButton, useStyles} from './login.style';
import {isLoginAction} from '../../duck/app/actions';
import {Body} from '../body/body';

export const Login: React.FC = ({}) => {
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    id: '',
    password: '',
    showPassword: false
  });
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const onLogin = () => {
    dispatch(isLoginAction());
  };

  if (appReducer.isLogin) {
    location.href = '/';
    return <Body />;
  } else {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <form className={classes.root} noValidate autoComplete="username">
            <TextField 
              className={clsx(classes.margin, classes.textField)} 
              value={values.id}
              onChange={handleChange("id")}
              type={'text'}
              label="ログインID"
              variant="outlined"
            />
          </form>
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">パスワード</InputLabel>
            <OutlinedInput
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <ColorButton
            variant="contained"
            className={classes.button}
            onClick={onLogin}
          >
            ログイン
          </ColorButton>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    );
  }
}