import ActionTypes from "./ActionTypes";

export const updateTile = (row,col) => {
    return {
      type: ActionTypes.UPDATE_TILE,
      payload: {
            row:row,
            col:col,
        }, 
    };
  };

  export const resetTile = () => {
    return {
      type: ActionTypes.RESET_TILE, 
    };
  };

  export const changePlayer = (player) => {
    return {
      type: ActionTypes.CHANGE_PLAYER, 
      payload: {
        player: player
      }
    };
  };