import {combineReducers} from 'redux';
import appReducer from './app/reducers';
import {ActionTypes} from './app/types';
import {Actions, RootState} from './types';
import {connectRouter} from 'connected-react-router';
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

const combineReducer = combineReducers<RootState, Actions>({
  router: connectRouter(history),
  app: appReducer
});
export const rootReducer = (state: RootState | undefined, action: Actions) => {
  if (action.type === ActionTypes.DESTROY_SESSION) {
    state = undefined;
  }
  return combineReducer(state, action);
};
