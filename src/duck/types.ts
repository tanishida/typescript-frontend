import {RouterAction, RouterState} from 'connected-react-router';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import * as appTypes from './app/types';
import {App} from './app/types';

export interface RootState { 
  router: RouterState,
  app: RootState.AppState;
}
export namespace RootState {
  export type AppState = App;
}
export type Actions = 
  | appTypes.AppActions
  | RouterAction;

export type ThunkPromiseAction<T = void> = ThunkAction<
  Promise<T>,
  RootState,
  undefined,
  Actions
>;

export type ThunkDispatchTypes = ThunkDispatch<RootState, undefined, Actions>;
