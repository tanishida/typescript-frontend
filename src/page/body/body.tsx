import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {RootState} from '../../duck/types';
import Button from '@material-ui/core/Button';
import {isLogoutAction} from '../../duck/app/actions';
import {Header} from '../header/header';
import {List} from '../list/list';
import {Add} from '../add/add';
import {constant} from '../../helper/common/common';
import MediaQuery from 'react-responsive';

export const Body: React.FC = ({}) => {
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);
  const dispatch = useDispatch();
  const selectComponent = (type: string) => {
    switch (type) {
      case constant.LIST:
        return <List />;
      case constant.ADD:
        return <Add />;
      default:
        return <List />;
    }
  }
  return (
      <div>
        <Header />
        <Grid container>
          <MediaQuery query="(max-width: 767px)">
            <Grid item xs={12}>
              {selectComponent(appReducer.componentType)}
            </Grid>
          </MediaQuery>
          <MediaQuery query="(min-width: 768px)">
            <Grid item xs={2} />
            <Grid item xs={9}>
              {selectComponent(appReducer.componentType)}
            </Grid>
            <Grid item xs={1} />
          </MediaQuery>
        </Grid>
      </div>
  )
}