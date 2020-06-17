import {RootState} from '../types';

import {ActionTypes, AppActions} from './types';

const initialState: (
  injects?: Partial<RootState.AppState>
) => RootState.AppState = injects => {
  return {
    isLoading: false,
    isLogin: false,
    ...injects
  };
};

const appReducer = (
  state: RootState.AppState = initialState(),
  action: AppActions
): RootState.AppState => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { 
        ...state,
        isLogin: true
      };
    case ActionTypes.SHOW_LOADING_SCREEN:
      return { 
        ...state,
        isLoading: true
      };
    case ActionTypes.DESTROY_SESSION:
      return { 
        ...state,
        isLogin: false
      };
    default: const _: never = action;
      return state; 
  }
};
export {initialState};
export default appReducer;