import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer, history} from './duck/reducers';
import {Provider} from 'react-redux';
import {App} from './app';
import {HashRouter} from 'react-router-dom';
import {ConnectedRouter, routerMiddleware} from 'connected-react-router';

const container: HTMLElement = document.getElementById('root')!;
const store = createStore(
  rootReducer,
  compose(applyMiddleware(routerMiddleware(history), thunk))
);

ReactDOM.render(    
  <Provider store={store}>
    <HashRouter hashType="slash">
      <App />
    </HashRouter>
  </Provider> 
  , container
);