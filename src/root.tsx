import log from 'loglevel';
import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import {App} from './app';
import {ReduxStoreInstance} from './duck/types';

export const Root: React.FC<{
  store: ReduxStoreInstance;
}> = ({store}) => {
  return (
    <Provider store={store}>
        <HashRouter hashType="slash">
          <App /> 
        </HashRouter>
    </Provider> 
  );
};