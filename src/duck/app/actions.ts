import {ActionTypes} from './types';

export const isLoginAction = () => ({
    type: ActionTypes.LOGIN
});

export const showLodingScreenAction = () => ({
    type: ActionTypes.SHOW_LOADING_SCREEN
});

export const isLogoutAction = () => ({
    type: ActionTypes.DESTROY_SESSION
});

export const changeCompomentAction = (componentType: string) => ({
    type: ActionTypes.CHANGE_COMPONENT,
    componentType
});

export const showDetailDialogAction = (isDetailDialogDisabled: boolean) => ({
    type: ActionTypes.SHOW_DETAIL_DIALOG,
    isDetailDialogDisabled
});

export const addListAction = (listArray: []) => ({
    type: ActionTypes.ADD_LIST,
    listArray
});

