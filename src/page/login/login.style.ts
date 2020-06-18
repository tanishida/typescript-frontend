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
      width: "100%",
      marginTop: "50px"
    },
    button: {
      width: "100%",
      marginTop: "50px"
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
