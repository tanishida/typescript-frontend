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
