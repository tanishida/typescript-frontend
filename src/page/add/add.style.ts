import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const AddStyledContainer = styled.div`
margin-top: 90px
`;
export const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    textField: {
      width: '15ch',
    },
  }));