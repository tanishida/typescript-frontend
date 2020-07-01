import React, {useEffect} from 'react';
import clsx from 'clsx';
import {useDispatch, useSelector} from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import {RootState} from '../../duck/types';
import {useTheme} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import AppBar from '@material-ui/core/AppBar';
import {isLogoutAction, changeCompomentAction} from '../../duck/app/actions';
import {useStyles, IconContainer, usePhoneStyles} from './header.style';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ContactsIcon from '@material-ui/icons/Contacts';
import {constant} from '../../helper/common/common';
import ListIcon from '@material-ui/icons/List';
import MediaQuery from 'react-responsive';
import TransformIcon from '@material-ui/icons/Transform';

export const Header: React.FC = ({}) => {
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openLogout = Boolean(anchorEl);
  const classes = useStyles();
  const classes2 = usePhoneStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogout = () => {
    dispatch(isLogoutAction());
    location.href = '../#/login';
  };
  const changeComponent = (text: string) => {
    dispatch(changeCompomentAction(text));
  }
  const selectTitle = (type: string) => {
    switch (type) {
      case constant.LIST:
        return 'ボードゲーム一覧';
      case constant.ADD:
        return '登録';
      case constant.DOMINION:
        return 'ドミニオンのサプライ作成';
      default:
        return 'ボードゲーム一覧';
    }
  }
  const logoutIcon = () => {
    return (
    <IconContainer>
    <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
    >
      <AccountCircle style={{fontSize: 30}} />
    </IconButton>
    <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
        open={openLogout}
        onClose={handleClose}
    >
        <MenuItem onClick={onLogout}>ログアウト</MenuItem>
    </Menu>
  </IconContainer>
    )
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <MediaQuery query="(max-width: 767px)">
        <AppBar
          position="fixed"
          className={clsx(classes2.appBar, {
            [classes2.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes2.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {selectTitle(appReducer.componentType)}
            </Typography>
            {logoutIcon()}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes2.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes2.drawerPaper,
          }}
        >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Tooltip title="ボードゲーム一覧">
            <ListItem button onClick={() => changeComponent(constant.LIST)}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={'ボードゲーム一覧'} />
            </ListItem>
          </Tooltip>
          <Tooltip title="ボードゲームを登録">
            <ListItem button onClick={() => changeComponent(constant.ADD)}>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary={'ボードゲームを登録'} />
            </ListItem>
          </Tooltip>
        </List>
        <Divider />
        <List>
          <Tooltip title="ドミニオンセット作成">
            <ListItem button onClick={() => changeComponent(constant.DOMINION)}>
              <ListItemIcon>
                <TransformIcon />
              </ListItemIcon>
              <ListItemText primary={'ドミニオンのセット作成'} />
            </ListItem>
          </Tooltip>
        </List>
        <Divider />
        <List>
          <Tooltip title="連絡先">
            <ListItem button>
              <ListItemIcon>
                <ContactsIcon />
              </ListItemIcon>
              <ListItemText primary={'連絡先'} />
            </ListItem>
          </Tooltip>
        </List>
        </Drawer>
      </MediaQuery>
      <MediaQuery query="(min-width: 768px)">
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {selectTitle(appReducer.componentType)}
          </Typography>
           {logoutIcon()}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Tooltip title="ボードゲーム一覧">
            <ListItem button onClick={() => changeComponent(constant.LIST)}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={'ボードゲーム一覧'} />
            </ListItem>
          </Tooltip>
          <Tooltip title="ボードゲームを登録">
            <ListItem button onClick={() => changeComponent(constant.ADD)}>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary={'ボードゲームを登録'} />
            </ListItem>
          </Tooltip>
        </List>
        <Divider />
        <List>
          <Tooltip title="ドミニオンセット作成">
            <ListItem button onClick={() => changeComponent(constant.DOMINION)}>
              <ListItemIcon>
                <TransformIcon />
              </ListItemIcon>
              <ListItemText primary={'ドミニオンのセット作成'} />
            </ListItem>
          </Tooltip>
        </List>
        <Divider />
        <List>
          <Tooltip title="連絡先">
            <ListItem button>
              <ListItemIcon>
                <ContactsIcon />
              </ListItemIcon>
              <ListItemText primary={'連絡先'} />
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>
      </MediaQuery>
    </div>
  );
}