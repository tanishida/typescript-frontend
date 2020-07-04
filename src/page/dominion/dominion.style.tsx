import React from 'react';
import { withStyles, Theme, createStyles, createMuiTheme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#fafafa',
      color: 'black',
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#696969'
    }
  })
)(TableRow);

export const tableTheme = createMuiTheme({
    overrides: {
      MuiTableRow: {
        root: {
          whiteSpace: 'nowrap'
        }
      } 
    }
})
