import ActionTypes from "./ActionTypes";

export const updateTile = (player,row,col) => {
    return {
      type: ActionTypes.UPDATE_TILE,
      payload: {
            player: player,
            row:row,
            col:col,
        }, 
    };
  };