import {asyncConstant} from './common';

const getParam = () => {

}

export const asyncActions = {
    postBoardGameAction: async (
        time: string,
        name: string,
        kibo: string,
        playTime: string,
        price: any,
        count: any
    ) => {
        const body = new FormData();
        body.append('time', time);
        body.append('name', name);
        body.append('kibo', kibo);
        body.append('playTime', playTime);
        body.append('price', price);
        body.append('count', count);
        await fetch(asyncConstant.LOCAL_URL + asyncConstant.ADD_BOARD_GAME, {
          mode: 'cors',
          method: 'POST',
          body
        }).catch(err => console.log(`'${err}'【POST】add board game`));
    },
    getBoardGameListAction: async () => {
        const response: any = await fetch(asyncConstant.LOCAL_URL + asyncConstant.GET_BOARD_GAME, {
          mode: 'cors',
          method: 'GET'
        }).catch(err => console.log(`'${err}'【GET】board game list`));
        return await response.json();
    }
}
  