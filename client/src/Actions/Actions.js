import ActionTypes from "./ActionTypes";

export const updateTile = (row,col) => (dispatch,getState) => {
  const player = getState().player;
    dispatch( {
      type: ActionTypes.UPDATE_TILE,
      payload: {
            row:row,
            col:col,
            player:player
        }, 
    });
  };

  export const resetTile = () => {
    return {
      type: ActionTypes.RESET_TILE, 
    };
  };

  export const changePlayer = (player) => (dispatch,getState) => {
    const isGameFinished = getState().isGameFinished;
    if(!isGameFinished){
      dispatch ({
        type: ActionTypes.CHANGE_PLAYER, 
        payload: {
          player: player
        }
      });
    }
    return null
  };

  export const runGameLogic = (row,col) => (dispatch,getState) => {
    const gameState = getState().gameState;
    dispatch( {
      type: ActionTypes.RUN_GAME_LOGIC,
      payload: {
        row: row,
        col: col,
        gameState:gameState
      }
    });
  };

  // export const executeGame = (row,col,player) => (dispatch,getState) => {
  //   const gameState = getState().gameState;
  //   const isGameFinished = getState().isGameFinished;
  //   // update the tile
  //   dispatch({
  //     type: ActionTypes.UPDATE_TILE,
  //     payload: {row:row,col:col,
  //   }})
  //   // run game logic
  //   dispatch({
  //     type: ActionTypes.RUN_GAME_LOGIC,
  //     payload: {row: row,col: col,gameState:gameState
  //   }})

  //   // change player
  //   if(!isGameFinished){
  //     dispatch ({
  //       type: ActionTypes.CHANGE_PLAYER, 
  //       payload: {
  //         player: player
  //       }
  //     });
  //   }
  //   return null
  // };