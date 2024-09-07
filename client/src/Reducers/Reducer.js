import ActionTypes from "../Actions/ActionTypes";


const tileReducer = (state, action) => {
    switch (action.type) {
      //update tile
      case ActionTypes.UPDATE_TILE:
        const newGameState = state.gameState
        const rowIndex = action.payload.row
        const colIndex = action.payload.col
        newGameState[rowIndex][colIndex] = state.player
        return {
            ...state,
            gameState: newGameState,
        }
      //reset tile
      case ActionTypes.RESET_TILE:
        const zeroState = [
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ]
        return {
          ...state,
          gameState: zeroState
        }
      //change player
      case ActionTypes.CHANGE_PLAYER:
        let newPlayer = action.payload.player
        let player = state.player
        if(newPlayer === -1) {
          player = player === 1 ? 2 : 1
        } else {
          player = newPlayer
        }
        return {
          ...state,
          player:player
        }
      default:
        return state;
    }
  };

  export default tileReducer;