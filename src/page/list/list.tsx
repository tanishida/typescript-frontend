import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {RootState} from '../../duck/types';
import Button from '@material-ui/core/Button';
import {isLogoutAction} from '../../duck/app/actions';
import {Header} from '../header/header';
import {useStyles, TableStyledContainer} from './list.style';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'time', label: '日時', minWidth: 100 },
  { id: 'name', label: 'イベント名', minWidth: 100 },
  {
    id: 'kibo',
    label: '規模',
    minWidth: 170
  },
  {
    id: 'updateTime',
    label: '更新日',
    minWidth: 170
  },
  {
    id: 'addTime',
    label: '登録日',
    minWidth: 170
  },
];
function createData(time: string, name: string, updateTime: string, addTime: string) {
  return {
    time: time,
    name: name,
    updateTime: updateTime,
    addTime: addTime
  };
}

const rows: any[] = [];

export const List: React.FC = ({}) => {
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TableStyledContainer>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={'center'}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((column, index) => {
                return (
                  <div key={index}>
                    <TableCell align={'center'}>
                      {column.time}
                    </TableCell>
                    <TableCell align={'center'}>
                      {column.name}
                    </TableCell>
                    <TableCell align={'center'}>
                      {column.updateTime}
                    </TableCell>
                    <TableCell align={'center'}>
                      {column.addTime}
                    </TableCell>
                  </div>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </TableStyledContainer>
  );
}