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
import {asyncActions} from '../../helper/common/actions';

const columns = [
  { id: 'time', label: '購入日', minWidth: 100 },
  { id: 'name', label: '名称', minWidth: 100 },
  {
    id: 'kibo',
    label: 'プレイ人数',
    minWidth: 100
  },
  {
    id: 'playTime',
    label: 'プレイ時間',
    minWidth: 170
  },
  {
    id: 'price',
    label: 'お値段（円）',
    minWidth: 100
  },
  {
    id: 'count',
    label: 'プレイ回数',
    minWidth: 100
  },
];

export const List: React.FC = ({}) => {
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    asyncActions.getBoardGameListAction()
    .then((res: any) => {
      setRows(res);
    })
    .catch(err => console.log(err));
  });
  return (
    <TableStyledContainer>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={'center'}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={index} align={'center'}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
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