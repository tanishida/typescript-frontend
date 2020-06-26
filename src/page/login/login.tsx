import React, {useEffect} from 'react';
import {push} from 'connected-react-router';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import FormHelperText from '@material-ui/core/FormHelperText';
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
import {ColorButton, useStyles, messageStyles} from './login.style';
import {isLoginAction} from '../../duck/app/actions';
import {Body} from '../body/body';
import MediaQuery from 'react-responsive';

export const Login: React.FC = ({}) => {
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);
  const dispatch = useDispatch();
  const classes = useStyles();
  const messageStyle = messageStyles();
  const [values, setValues] = React.useState({
    id: '',
    pass: ''
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [idError, setIdError] = React.useState(false);
  const [passError, setPassError] = React.useState(false);
  const [idMessage, setIdMessage] = React.useState('');
  const [passMessage, setPassMessage] = React.useState('');

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop === 'id') {
      setIdError(false);
      setIdMessage('');
    }
    if (prop === 'pass') {
      setPassError(false);
      setPassMessage('');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleIdCheck = (paramId: string) => {
    if (paramId === '') {
      setIdError(true);
      setIdMessage('ID未入力');
      return true;
    }
    return false;
  }

  const handlePassCheck = (paramPass: string) => {
    if (paramPass === '') {
      setPassError(true);
      setPassMessage('PASS未入力');
      return true;
    }
    return false;
  }

  const onLogin = () => {
    if (handleIdCheck(values.id) && handlePassCheck(values.pass)) {
      return;
    }
    if (handleIdCheck(values.id)) {
      return;
    }
    if (handlePassCheck(values.pass)) {
      return;
    }
    dispatch(isLoginAction());
  };

  if (appReducer.isLogin) {
    location.href = '../#/home';
    return <Body />;
  } else {
    return (
      <div>
        <Grid container>
        <MediaQuery query="(max-width: 767px)">
          <Grid item xs={12}>
            <Card style={{textAlign: 'center'}}>
            <Typography variant="h6">
              ログイン
            </Typography>
            <form className={classes.root} noValidate>
              <TextField 
                className={clsx(classes.margin, classes.textField)} 
                value={values.id}
                onChange={handleChange("id")}
                type={'text'}
                label="login ID"
                variant="outlined"
                error={idError}
                helperText={idMessage}
              />
            </form>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel error={passError} htmlFor="outlined-adornment-password">password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                error={passError}
                value={values.pass}
                onChange={handleChange("pass")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
              <FormHelperText className={messageStyle.root}>{passMessage}</FormHelperText>
            </FormControl>
            <ColorButton
              variant="contained"
              className={classes.button}
              onClick={onLogin}
            >
              ログイン
            </ColorButton>
            </Card>
          </Grid>
        </MediaQuery>
        <MediaQuery query="(min-width: 768px)">
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Card style={{textAlign: 'center'}}>
            <Typography variant="h6">
              ログイン
            </Typography>
            <form className={classes.root} noValidate>
              <TextField 
                className={clsx(classes.margin, classes.textField)} 
                value={values.id}
                onChange={handleChange("id")}
                type={'text'}
                label="login ID"
                variant="outlined"
                error={idError}
                helperText={idMessage}
              />
            </form>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel error={passError} htmlFor="outlined-adornment-password">password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                error={passError}
                value={values.pass}
                onChange={handleChange("pass")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
              <FormHelperText className={messageStyle.root}>{passMessage}</FormHelperText>
            </FormControl>
            <ColorButton
              variant="contained"
              className={classes.button}
              onClick={onLogin}
            >
              ログイン
            </ColorButton>
            </Card>
          </Grid>
          <Grid item xs={3} />
        </MediaQuery>
        </Grid>
      </div>
    );
  }
}