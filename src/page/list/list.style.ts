import styled from 'styled-components';
import {makeStyles, createMuiTheme} from '@material-ui/core/styles';

export const tableHeadTheme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        whiteSpace: 'nowrap'
      }
    } 
  }
})
export const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

export const useBackDropStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  },
}));

export const TableStyledContainer = styled.div`
margin-top: 90px
`;