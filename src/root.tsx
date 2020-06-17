import log from 'loglevel';
import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';
import {App} from './app';
import {ReduxStoreInstance} from './duck/types';

const GlobalStyle = createGlobalStyle` 
  ${reset} 
  html, body, #root {
    height: 100%; 
  } 
  body { 
    font-family: 'ヒラギノ角ゴ ProN W3', Hiragino Kaku Gothic ProN, Arial,
    'メイリオ', Meiryo, sans-serif, FontAwesome; 
    font-size: 16px; 
    line-height: 1.5em; 
    min-width: 970px; 
    min-height: 640px; 
  }`;
export const Root: React.FC<{
  store: ReduxStoreInstance;
}> = ({store}) => {
  return (
    <Provider store={store}>
        <HashRouter hashType="slash">
          <GlobalStyle /> 
          <App /> 
        </HashRouter>
    </Provider> 
  );
};