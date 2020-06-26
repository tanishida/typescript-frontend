import {ThunkPromiseAction, ThunkDispatchTypes} from '../types';
import {disabledAction, openSnackberAction} from './actions';
import {asyncActions} from '../../helper/common/actions';

export const addBoardGame = (
  selectedDate: any,
  nameValue: string,
  player: string,
  playTimeValue: string,
  pliceValue: string,
  detail: string
): ThunkPromiseAction => async (dispatch: ThunkDispatchTypes, getState) => {
  const appReducer = getState().app;
  return await asyncActions
  .postBoardGameAction(
    selectedDate.toLocaleDateString(),
    nameValue,
    player,
    playTimeValue + '分',
    pliceValue + '円',
    '0',
    detail
  )
  .then(() => {
    dispatch(openSnackberAction(!appReducer.openSnackbar));
    dispatch(disabledAction());
  })
  .catch(err => {
    dispatch(disabledAction());
    console.log(err);
  })
}
