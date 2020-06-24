import {CreatorsToActions} from '../../helper/util/types';
import * as actionCreators from './actions';

export const ActionTypes = {
  LOGIN: 'app/LOGIN',
  SHOW_LOADING_SCREEN: 'app/SHOW_LOADING_SCREEN',
  DESTROY_SESSION: 'app/DESTROY_SESSION',
  CHANGE_COMPONENT: 'app/CHANGE_COMPONENT',
  SHOW_DETAIL_DIALOG: 'app/SHOW_DETAIL_DIALOG',
  ADD_LIST: 'app/ADD_LIST'
} as const;

export type AppActions = CreatorsToActions<typeof actionCreators>;

export interface App {
  isLoading: boolean;
  isLogin: boolean;
  componentType: string;
  isDetailDialogDisabled: boolean;
  listArray: [];
}