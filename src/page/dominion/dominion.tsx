import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {RootState} from '../../duck/types';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DoneIcon from '@material-ui/icons/Done';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {StyledTableCell, StyledTableRow, tableTheme} from './dominion.style';
import { ThemeProvider } from '@material-ui/core/styles';
import {asyncActions} from '../../helper/common/actions';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  useEffect(() => {
    setValue([]);
  },[]);
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);
  const dispatch = useDispatch();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <DoneIcon fontSize="small" />;
  const [value, setValue] = React.useState([...dominions]);
  const [supply, setSupply] = React.useState([]);
  const [nonSupply, setNonSupply] = React.useState([]);
  const [selterList, setSelterList] = React.useState([]);
  const [ruinsList, setRuinsList] = React.useState([]);
  const [adventuresEventList, setAdventuresEventList] = React.useState([]);
  const [empiresEventList, setEmpiresEventList] = React.useState([]);
  const [menagerieEventList, setMenagerieEventList] = React.useState([]);
  const [wayList, setWayList] = React.useState([]);
  const [randmarkList, setRandmarkList] = React.useState([]);
  const [travelerList, setTravelerList] = React.useState([]);
  const [curseList, setCurseList] = React.useState([]);
  const [heirloomList, setHeirloomList] = React.useState([]);
  const [blessingList, setBlessingList] = React.useState([]);
  const [projectList, setProjectList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [adventuresEvent, setAdventuresEvent] = React.useState(0);
  const [menagerieEvent, setMenagerieEvent] = React.useState(0);
  const [way, setWay] = React.useState(1);
  const [empiresEvent, setEmpiresEvent] = React.useState(0);
  const [randmark, setRandmark] = React.useState(0);
  const [project, setProject] = React.useState(0);
  const [traveler, setTraveler] = React.useState(0);
  const [adventuresFlag, setAdventuresFlag] = React.useState(false);
  const [empiresFlag, setEmpiresFlag] = React.useState(false);
  const [projectFlag, setProjectFlag] = React.useState(false);
  const [menagerieFlag, setMenagerieFlag] = React.useState(false);
  const onMakeDominionAction = () => {
    asyncActions
    .postDominionAction(
      value,
      adventuresEvent.toString(),
      traveler.toString(),
      empiresEvent.toString(),
      randmark.toString(),
      project.toString(),
      menagerieEvent.toString(),
      way.toString()
    )
    .then((res: any) => {
      setSupply(res.supplyList);
      setNonSupply(res.nonSupplyList);
      setSelterList(res.selterList);
      setRuinsList(res.ruinsList);
      setAdventuresEventList(res.adventuresEventList);
      setTravelerList(res.travelerList);
      setEmpiresEventList(res.empiresEventList);
      setRandmarkList(res.randmarkList);
      setCurseList(res.curseList);
      setHeirloomList(res.heirloomList);
      setBlessingList(res.blessingList);
      setProjectList(res.projectList);
      setMenagerieEventList(res.menagerieEventList);
      setWayList(res.wayList);
    })
    .catch((err: any) => {
      console.log(err);
    })
  }
  const clearAction = () => {
    setValue([]);
    setSupply([]);
    setNonSupply([]);
    setSelterList([]);
    setRuinsList([]);
    setAdventuresEvent(0);
    setTraveler(0);
    setAdventuresEventList([]);
    setTravelerList([]);
    setAdventuresFlag(false);
    setEmpiresEventList([]);
    setRandmarkList([]);
    setEmpiresFlag(false);
    setCurseList([]);
    setHeirloomList([]);
    setBlessingList([]);
    setProjectList([]);
    setProjectFlag(false);
    setMenagerieFlag(false);
    setMenagerieEventList([]);
    setWayList([]);
  }

  return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Button　color="primary" onClick={onMakeDominionAction}>サプライ作成！</Button>
            <Button onClick={clearAction}>クリア</Button>
          </Grid>
          <Grid item xs={12}>
            <Accordion style={{display: adventuresFlag ? '' : 'none', marginBottom: '10px'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>冒険（イベント・トラベラー）</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl>
                  <InputLabel>イベント</InputLabel>
                  <Select
                    native
                    value={adventuresEvent}
                    onChange={(e: any) => setAdventuresEvent(e.target.value)}
                    style={{marginTop: '10px', width: 120, marginBottom: '10px'}}
                  >
                    <option value={0}>無し</option>
                    <option value={1}>１枚</option>
                    <option value={2}>２枚</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel>トラベラー</InputLabel>
                  <Select
                    native
                    value={traveler}
                    onChange={(e: any) => setTraveler(e.target.value)}
                    style={{marginTop: '10px', width: 120, marginBottom: '10px'}}
                  >
                    <option value={0}>無し</option>
                    <option value={1}>騎士見習い</option>
                    <option value={2}>教師</option>
                    <option value={3}>両方</option>
                  </Select>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12}>
            <Accordion style={{display: empiresFlag ? '' : 'none', marginBottom: '10px'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>帝国（イベント・ランドマーク）</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl>
                  <InputLabel>イベント</InputLabel>
                  <Select
                    native
                    value={empiresEvent}
                    onChange={(e: any) => setEmpiresEvent(e.target.value)}
                    style={{marginTop: '10px', width: 120, marginBottom: '10px'}}
                  >
                    <option value={0}>無し</option>
                    <option value={1}>１枚</option>
                    <option value={2}>２枚</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel>ランドマーク</InputLabel>
                  <Select
                    native
                    value={randmark}
                    onChange={(e: any) => setRandmark(e.target.value)}
                    style={{marginTop: '10px', width: 120, marginBottom: '10px'}}
                  >
                    <option value={0}>無し</option>
                    <option value={1}>１枚</option>
                    <option value={2}>２枚</option>
                    <option value={3}>３枚</option>
                  </Select>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12}>
            <Accordion style={{display: projectFlag ? '' : 'none', marginBottom: '10px'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>ルネサンス（プロジェクト）</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl>
                  <InputLabel>プロジェクト</InputLabel>
                  <Select
                    native
                    value={project}
                    onChange={(e: any) => setProject(e.target.value)}
                    style={{marginTop: '10px', width: 120, marginBottom: '10px'}}
                  >
                    <option value={0}>無し</option>
                    <option value={1}>１枚</option>
                    <option value={2}>２枚</option>
                    <option value={3}>３枚</option>
                  </Select>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12}>
            <Accordion style={{display: menagerieFlag ? '' : 'none', marginBottom: '10px'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>移動動物園（イベント・習性）</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl>
                  <InputLabel>イベント</InputLabel>
                  <Select
                    native
                    value={menagerieEvent}
                    onChange={(e: any) => setMenagerieEvent(e.target.value)}
                    style={{marginTop: '10px', width: 120, marginBottom: '10px'}}
                  >
                    <option value={0}>無し</option>
                    <option value={1}>１枚</option>
                    <option value={2}>２枚</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel>習性</InputLabel>
                  <Select
                    native
                    value={way}
                    onChange={(e: any) => setWay(e.target.value)}
                    style={{marginTop: '10px', width: 120, marginBottom: '10px'}}
                  >
                    <option value={1}>１枚</option>
                    <option value={2}>２枚</option>
                  </Select>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </Grid>

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
                ]);
                if (newValue.some(a => a.value === 'adventures')) {
                  setAdventuresFlag(true);
                } else {
                  setAdventuresFlag(false);
                }
                if (newValue.some(a => a.value === 'empires')) {
                  setEmpiresFlag(true);
                } else {
                  setEmpiresFlag(false);
                }
                if (newValue.some(a => a.value === 'renaissance')) {
                  setProjectFlag(true);
                } else {
                  setProjectFlag(false);
                }
                if (newValue.some(a => a.value === 'menagerie')) {
                  setMenagerieFlag(true);
                } else {
                  setMenagerieFlag(false);
                }
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
          <Grid item xs={12}>
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
                    <TableBody>
                      {supply.map((row: any, index: number) => (
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
            <div style={{display: nonSupply.length > 0 ? '' : 'none'}}>
              <Typography variant="h6" noWrap>
                サプライ外
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: nonSupply.length > 0 ? '' : 'none'}}>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableBody>
                      {nonSupply.map((row: any, index: number) => (
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
                            <div style={{color: row.color3}}>
                              {row.type3}
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                    </Table>
                </TableContainer>
              </ThemeProvider>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: selterList.length > 0 ? '' : 'none'}}>
              <Typography variant="h6" noWrap>
                避難所（暗黒時代）
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: selterList.length > 0 ? '' : 'none'}}>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableBody>
                      {selterList.map((row: any, index: number) => (
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
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: ruinsList.length > 0 ? '' : 'none'}}>
              <Typography variant="h6" noWrap>
                廃墟（暗黒時代）
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: ruinsList.length > 0 ? '' : 'none'}}>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableBody>
                      {ruinsList.map((row: any, index: number) => (
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
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: adventuresEventList.length > 0 ? '' : 'none'}}>
              <Typography variant="h6" noWrap>
                イベント（冒険）
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: adventuresEventList.length > 0 ? '' : 'none'}}>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableBody>
                      {adventuresEventList.map((row: any, index: number) => (
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
            </div>
          </Grid>

          <Grid item xs={12}>
            <div style={{display: empiresEventList.length > 0 ? '' : 'none'}}>
              <Typography variant="h6" noWrap>
                イベント（帝国）
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: empiresEventList.length > 0 ? '' : 'none'}}>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableBody>
                      {empiresEventList.map((row: any, index: number) => (
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
            </div>
          </Grid>

          <Grid item xs={12}>
            <div style={{display: travelerList.length > 0 ? '' : 'none'}}>
              <Typography variant="h6" noWrap>
                トラベラー（冒険）
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: travelerList.length > 0 ? '' : 'none'}}>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableBody>
                      {travelerList.map((row: any, index: number) => (
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
            </div>
          </Grid>

          <Grid item xs={12}>
            <div style={{display: randmarkList.length > 0 ? '' : 'none'}}>
              <Typography variant="h6" noWrap>
                ランドマーク（帝国）
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: randmarkList.length > 0 ? '' : 'none'}}>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableBody>
                      {randmarkList.map((row: any, index: number) => (
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
            </div>
          </Grid>

          <Grid item xs={12}>
            <div style={{display: blessingList.length > 0 ? '' : 'none'}}>
              <Typography variant="h6" noWrap>
                祝福（夜想曲）
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: blessingList.length > 0 ? '' : 'none'}}>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableBody>
                      {blessingList.map((row: any, index: number) => (
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
            </div>
          </Grid>

          <Grid item xs={12}>
            <div style={{display: curseList.length > 0 ? '' : 'none'}}>
              <Typography variant="h6" noWrap>
                呪詛（夜想曲）
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: curseList.length > 0 ? '' : 'none'}}>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableBody>
                      {curseList.map((row: any, index: number) => (
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
            </div>
          </Grid>

          <Grid item xs={12}>
            <div style={{display: heirloomList.length > 0 ? '' : 'none'}}>
              <Typography variant="h6" noWrap>
                家宝（夜想曲）
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: heirloomList.length > 0 ? '' : 'none'}}>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableBody>
                      {heirloomList.map((row: any, index: number) => (
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
                            <div style={{color: row.color3}}>
                              {row.type3}
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                    </Table>
                </TableContainer>
              </ThemeProvider>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div style={{display: projectList.length > 0 ? '' : 'none'}}>
              <Typography variant="h6" noWrap>
                プロジェクト（ルネサンス）
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: projectList.length > 0 ? '' : 'none'}}>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableBody>
                      {projectList.map((row: any, index: number) => (
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
            </div>
          </Grid>

          <Grid item xs={12}>
            <div style={{display: menagerieEventList.length > 0 ? '' : 'none'}}>
              <Typography variant="h6" noWrap>
                イベント（移動動物園）
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: menagerieEventList.length > 0 ? '' : 'none'}}>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableBody>
                      {menagerieEventList.map((row: any, index: number) => (
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
            </div>
          </Grid>

          <Grid item xs={12}>
            <div style={{display: wayList.length > 0 ? '' : 'none'}}>
              <Typography variant="h6" noWrap>
                習性（移動動物園）
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: wayList.length > 0 ? '' : 'none'}}>
              <ThemeProvider theme={tableTheme}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table"　size={'small'}>
                    <TableBody>
                      {wayList.map((row: any, index: number) => (
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
            </div>
          </Grid>

        </Grid>
      </div>
  )
}