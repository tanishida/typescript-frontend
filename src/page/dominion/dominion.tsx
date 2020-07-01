import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {RootState} from '../../duck/types';
import Button from '@material-ui/core/Button';
import {isLogoutAction} from '../../duck/app/actions';
import {Header} from '../header/header';
import {List} from '../list/list';
import {Add} from '../add/add';
import {constant} from '../../helper/common/common';
import MediaQuery from 'react-responsive';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DoneIcon from '@material-ui/icons/Done';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {StyledTableCell, StyledTableRow, tableTheme} from './dominion.style';
import { ThemeProvider } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {asyncActions} from '../../helper/common/actions';

const dominions = [
    { title: '基本', value: 'standard' },
    { title: '陰謀', value: 'intrigue' },
    { title: '海辺', value: 'seaside' },
    { title: '錬金術', value: 'alchemy' },
    { title: '繁栄', value: 'prosperity' },
    { title: '収穫祭', value: 'cornucopia' },
    { title: '異郷', value: 'hinterlands' },
    { title: '暗黒時代', value: 'darkAges' },
    { title: 'ギルド', value: 'guild' },
    { title: '冒険', value: 'adventures' },
    { title: '帝国', value: 'empires' },
    { title: '夜想曲', value: 'nocturne' },
    { title: 'ルネサンス', value: 'renaissance' },
    { title: '移動動物園', value: 'menagerie' }
  ];

export const Dominion: React.FC = ({}) => {
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);
  const dispatch = useDispatch();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <DoneIcon fontSize="small" />;
  const [value, setValue] = React.useState([...dominions]);
  const [rows, setRows] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const onMakeDominionAction = () => {
    asyncActions
    .postDominionAction(value)
    .then((res: any) => {
        setRows(res);
    })
    .catch((err: any) => {
      console.log(err);
    })
  }
  const clearAction = () => {
    setValue([]);
    setRows([]);
  }

  return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={dominions}
              value={value}
              inputValue={inputValue}
              noOptionsText={'見つかりません'}
              onChange={(e, newValue) => {
                setValue([
                  ...newValue.filter(
                    (option: any) => 
                    dominions.indexOf(option.value) === -1
                  )
                ])
              }}
              onInputChange={(e, newInputValue) => {
                setInputValue(newInputValue);
              }}
              disableCloseOnSelect
              getOptionLabel={(option: any) => option.title}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.title}
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="シリーズを選択"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Button　color="primary" onClick={onMakeDominionAction}>作成</Button>
            <Button onClick={clearAction}>クリア</Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" noWrap>
              サプライ
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ThemeProvider theme={tableTheme}>
              <TableContainer component={Paper}>
                  <Table aria-label="customized table"　size={'small'}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>カード名</StyledTableCell>
                          <StyledTableCell>シリーズ</StyledTableCell>
                          <StyledTableCell>種別</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row: any, index: number) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                              <div style={{color: 'white'}}>
                                {row.name}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div style={{color: 'white'}}>
                                {row.series}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div style={{color: row.color}}>
                                {row.type}
                              </div>
                              <div style={{color: row.color2}}>
                                {row.type2}
                              </div>
                            </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
              </TableContainer>
            </ThemeProvider>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" noWrap>
              サプライ外
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>カード名</StyledTableCell>
                        <StyledTableCell>シリーズ</StyledTableCell>
                        <StyledTableCell>種別</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row: any, index: number) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell>{row.series}</StyledTableCell>
                          <StyledTableCell>{row.type}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                    </Table>
                </TableContainer>
              </ThemeProvider>
            </div>
          </Grid>
        </Grid>
      </div>
  )
}