import {combineReducers} from 'redux';
import appReducer from './app/reducers';
import {ActionTypes} from './app/types';
import {Actions, RootState} from './types';

const combineReducer = combineReducers<RootState, Actions>({
  app: appReducer
});
const rootReducer = (state: RootState | undefined, action: Actions) => {
  if (action.type === ActionTypes.DESTROY_SESSION) {
    state = undefined;
  }
  return combineReducer(state, action);
};

export default rootReducer;