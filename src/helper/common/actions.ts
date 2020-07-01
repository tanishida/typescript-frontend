import {asyncConstant} from './common';

const getPath = () => {
  switch (document.location.origin) {
    case asyncConstant.LOCAL_FRONT_URL:
      return asyncConstant.LOCAL_URL;
    default:
      return asyncConstant.GLITCH_URL;
  }
}

export const asyncActions = {
    postBoardGameAction: async (
        time: string,
        name: string,
        kibo: string,
        playTime: string,
        price: string,
        count: string,
        detail: string
    ) => {
        const body = new FormData();
        body.append('time', time);
        body.append('name', name);
        body.append('kibo', kibo);
        body.append('playTime', playTime);
        body.append('price', price);
        body.append('count', count);
        body.append('detail', detail);
        await fetch(getPath() + asyncConstant.ADD_BOARD_GAME, {
          mode: 'cors',
          method: 'POST',
          body
        }).catch(err => console.log(`'${err}'【POST】add board game`));
    },
    getBoardGameListAction: async () => {
        const response: any = await fetch(getPath() + asyncConstant.GET_BOARD_GAME, {
          mode: 'cors',
          method: 'GET'
        }).catch(err => console.log(`'${err}'【GET】board game list`));
        return await response.json();
    },
    putBoardGameListAction: async (id: string, counterType: string, type: string, editDetail: string) => {
        const body = new FormData();
        body.append('counterType', counterType);
        body.append('type', type);
        body.append('editDetail', editDetail);
        await fetch(
          getPath() + asyncConstant.PUT_BOARD_GAME + id, 
        {
          mode: 'cors',
          method: 'PUT',
          body
        }).catch(err => console.log(`'${err}'【GET】board game list`));
    },
    postDominionAction: async (
      values: any[]
    ) => {
      const body = new FormData();
      values.forEach(a => {
        body.append(a.value, a.value)
      });
      const response: any = await fetch(getPath() + asyncConstant.PUT_DOMINION, {
        mode: 'cors',
        method: 'POST',
        body
      }).catch(err => console.log(`'${err}'【POST】doominion`));
      return await response.json();
    }
}
  