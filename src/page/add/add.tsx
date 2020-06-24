import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {RootState} from '../../duck/types';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from "date-fns/locale/ja";
import format from "date-fns/format";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {AddStyledContainer, useStyles} from './add.style';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';
import {asyncActions} from '../../helper/common/actions';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ExtendedUtils extends DateFnsUtils {
  getCalendarHeaderText(date: any) {
    return format(date, "yyyy年 MMM", { locale: this.locale }); 
  }
  getDatePickerHeaderText(date: any) {
    return format(date, "MMMd日", { locale: this.locale }); 
  } 
}

export const Add: React.FC = ({}) => {
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [nameValue, setNameValue] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [detail, setDetail] = React.useState('');
  const [player, setPlayer] = React.useState('3-5人');
  const [values, setValues] = React.useState({
    pliceValue: '3000',
    playTimeValue: '15',
  });

  const TextMaskCustom = (props: any) => {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref: any) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[ /\d/, '-', /\d/, '人']}
        placeholderChar={'\u2000'}
        showMask
        value={player}
        onBlur={handleChangePlayer}
      />
    );
  }
  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };

  const onChangeNameValue = (e: any) => {
    setNameValue(e.target.value);
  }
  const handleChangePlayer = (e: any) => {
    setPlayer(e.target.value)
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  const handleDetailOnChange = (e: any) => {
    setDetail(e.target.value);
  }

  const handleChange = (event: any) => {
    if (isNaN(event.target.value)) {
      return;
    }
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const onRegist = () => {
    setIsDisabled(true);
    setTimeout(() => {
      asyncActions
      .postBoardGameAction(
        selectedDate.toLocaleDateString(),
        nameValue,
        player,
        values.playTimeValue + '分',
        values.pliceValue + '円',
        '0',
        detail
      )
      .then(() => {
        setIsDisabled(false);
        handleClick();
      })
      .catch(err => {
        console.log(err);
        setIsDisabled(false);
      });
    }, 2000);
  };
  const clearState = () => {
    setNameValue('');
    setSelectedDate(new Date());
    setPlayer('-人');
    setValues({
      pliceValue: '',
      playTimeValue: '',
    });
    setDetail('');
  }
  return (
      <AddStyledContainer>
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <div className={classes.root}>
              <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
                <KeyboardDatePicker
                  margin="normal"
                  label="購入日"
                  format="yyyy/MM/dd"
                  value={selectedDate}
                  disabled={isDisabled}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <form noValidate autoComplete="off">
                <TextField 
                  id="standard-basic"
                  label="名称"
                  value={nameValue}
                  disabled={isDisabled}
                  onChange={(e: any) => onChangeNameValue(e)}
                />
              </form>
              <FormControl>
                <InputLabel htmlFor="formatted-text-mask-input">プレイ人数</InputLabel>
                <Input
                  value={player}
                  onChange={handleChangePlayer}
                  disabled={isDisabled}
                  inputComponent={TextMaskCustom}
                />
              </FormControl>
              <TextField
                label="お値段（円）"
                value={values.pliceValue}
                name="pliceValue"
                disabled={isDisabled}
                onChange={handleChange}
                id="formatted-numberformat-input"
                InputProps={{
                  startAdornment: <InputAdornment position="start">¥</InputAdornment>,
                }}
              />
              <TextField
                label="プレイ時間"
                value={values.playTimeValue}
                name="playTimeValue"
                disabled={isDisabled}
                className={classes.textField}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">分</InputAdornment>,
                }}
              />
            </div>
          </Grid>
          <Grid item xs={2} />

          <Grid item xs={2} />
          <Grid item xs={8}>
            <TextField
              label="詳細"
              multiline
              fullWidth
              rows={8}
              disabled={isDisabled}
              value={detail}
              onChange={(e: any) => handleDetailOnChange(e)}
            />
          </Grid>
          <Grid item xs={2} />

          <Grid item xs={2} />
          <Grid item xs={8}>
            <div className={classes.root}>
              <Button
                onClick={onRegist}
                disabled={isDisabled}
                variant="contained"
                color="primary"
              >
                登録
              </Button>
              <Button
                onClick={clearState}
                disabled={isDisabled}
                variant="contained"
              >
                クリア
              </Button>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top', horizontal: 'center'
                }}
              >
                <Alert onClose={handleClose} severity="success">
                  登録しました！
                </Alert>
              </Snackbar>
            </div>
            <LinearProgress style={{display: isDisabled ? '' : 'none'}} />
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </AddStyledContainer>
  )
}