import Button from '@material-ui/core/Button';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "90%",
    textAlign: 'center',
    marginTop: "25px"
  },
  button: {
    width: "90%",
    marginTop: "25px",
    marginBottom: "10px"
  }
}));

export const messageStyles = makeStyles(theme => ({
  root: {
    color: '#f44336',
    textAlign: 'start'
  }
}));

export const ColorButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
}))(Button);
