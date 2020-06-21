import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {RootState} from '../../duck/types';
import Button from '@material-ui/core/Button';
import {isLogoutAction} from '../../duck/app/actions';
import {Header} from '../header/header';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from "date-fns/locale/ja";
import format from "date-fns/format";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {AddStyledContainer, useStyles} from './add.style';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';
import {asyncActions} from '../../helper/common/actions';

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

  const onChangeNameValue = (e: any) => {
    setNameValue(e.target.value);
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  const TextMaskCustom = (props: any) => {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref: any) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /\d/, '-', /\d/, ')', '人']}
        placeholderChar={'\u2000'}
        showMask
        onBlur={() => {}}
      />
    );
  }
  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };
  const NumberFormatCustom = (props: any) => {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values :any) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="¥"
      />
    );
  }
  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  const TimeNumberFormatCustom = (props: any) => {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values :any) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        suffix="分"
      />
    );
  }
  TimeNumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  const [values, setValues] = React.useState({
    textmask: '(3-5)人',
    numberformat: '3000',
    timenumberformat: '15',
  });

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onRegist = () => {
    asyncActions
    .postBoardGameAction(
      selectedDate.toLocaleDateString(),
      nameValue,
      values.textmask,
      values.timenumberformat,
      values.numberformat,
      '0'
    )
    .then(() => {
      
    })
    .catch((err: any) => console.log(err));
  };
  const clearState = () => {
    setNameValue('');
    setSelectedDate(new Date());
    setValues({
      textmask: '',
      numberformat: '',
      timenumberformat: '',
    });
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
                  onChange={(e: any) => onChangeNameValue(e)}
                />
              </form>
              <FormControl>
                <InputLabel htmlFor="formatted-text-mask-input">プレイ人数</InputLabel>
                <Input
                  value={values.textmask}
                  onChange={handleChange}
                  name="textmask"
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                />
              </FormControl>
              <TextField
                label="お値段（円）"
                value={values.numberformat}
                onChange={handleChange}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              <TextField
                label="プレイ時間"
                value={values.timenumberformat}
                onChange={handleChange}
                name="timenumberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: TimeNumberFormatCustom,
                }}
              />
            </div>
          </Grid>
          <Grid item xs={2} />

          <Grid item xs={2} />
          <Grid item xs={8}>
            <div className={classes.root}>
              <Button onClick={onRegist} variant="contained" color="primary">
                登録
              </Button>
              <Button  onClick={clearState} variant="contained">
                クリア
              </Button>
            </div>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </AddStyledContainer>
  )
}