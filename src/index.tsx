import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './duck/reducers';
import {Root} from './root';

const container: HTMLElement = document.getElementById('root')!;
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Root store={store} />, container);