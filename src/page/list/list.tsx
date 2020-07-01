import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {RootState} from '../../duck/types';
import Button from '@material-ui/core/Button';
import {isLogoutAction, showDetailDialogAction, addListAction} from '../../duck/app/actions';
import {Header} from '../header/header';
import StorageIcon from '@material-ui/icons/Storage';
import {useStyles, useBackDropStyles, tableHeadTheme} from './list.style';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {asyncActions} from '../../helper/common/actions';
import {columns} from './headerData';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import {ThemeProvider} from '@material-ui/core/styles';
import {DetailDialog} from './detailDialog';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

export const List: React.FC = () => {
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);
  const dispatch = useDispatch();

  const classes = useStyles();
  const backDropClasses = useBackDropStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [dialogValues, setDialogValues] = React.useState({
    id: '',
    name: '',
    detail:''
  });
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDetail = (id: string, name: string, detail: string) => {
    dispatch(showDetailDialogAction(true));
    setDialogValues({
      id: id,
      name: name,
      detail: detail
    })
  };
  const handleCounter = (id: string, type: string) => {
    asyncActions
    .putBoardGameListAction(id, type, 'count', '')
    .then(() => {
      asyncActions
      .getBoardGameListAction()
      .then((res: any) => {
        dispatch(addListAction(res));
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    setOpen(true);
    setTimeout(() => {
      asyncActions
      .getBoardGameListAction()
      .then((res: any) => {
        dispatch(addListAction(res));
      })
      .then(() => {
        setOpen(false);
      })
      .catch(err => {
        console.log(err);
        setOpen(false);
      });
    }, 1000);
  },[]);
  return (
    <div>
      <Backdrop className={backDropClasses.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <ThemeProvider theme={tableHeadTheme}>
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    !column.disabled ? 
                    <TableCell
                      key={index}
                      align={'center'}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                    : ''
                  ))}
                </TableRow>
              </TableHead>
            </ThemeProvider>
            <TableBody>
              {appReducer.listArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {
                      columns.map((column, index) => {
                        const value = row[column.id];
                        return (
                          !column.disabled
                          ? 
                            column.id === 'detail'
                            ?
                              <TableCell key={index} align={'center'}>

                                <IconButton
                                  onClick={() => handleDetail(row['id'], row['name'], row['detail'])}
                                >
                                  <StorageIcon />
                                </IconButton>

                              </TableCell>
                            :
                              column.id === 'count' ? 
                                <TableCell key={index} align={'center'}>
                                  <IconButton onClick={() => handleCounter(row['id'], 'plus')} color="primary">
                                    <AddIcon fontSize="small" />
                                  </IconButton>
                                  {value}
                                  <IconButton
                                    onClick={() => handleCounter(row['id'], 'minus')}
                                    color="secondary"
                                    disabled={row['count'] === '0' ? true : false}
                                  >
                                    <RemoveIcon fontSize="small" />
                                  </IconButton>
                                </TableCell>
                              :
                                <TableCell key={index} align={'center'}>
                                  {value}
                                </TableCell>
                          : ''
                        );
                      })
                    }
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={appReducer.listArray.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage={'1ページあたりの行数:'}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <DetailDialog
        name={dialogValues.name}
        detail={dialogValues.detail}
      />
    </div>
  );
}