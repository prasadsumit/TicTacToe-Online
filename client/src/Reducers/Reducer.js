import ActionTypes from "../Actions/ActionTypes";


const tileReducer = (state, action) => {
    switch (action.type) {
      case ActionTypes.UPDATE_TILE:

        const newGameState = [...state.gameState]
        const rowIndex = action.payload.row
        const colIndex = action.payload.col
        const player = action.payload.player

        if(newGameState[rowIndex][colIndex] === 0){
            console.log("hello")
            newGameState[rowIndex][colIndex] = player
        }
        return {
            ...state,
            gameState: newGameState
        }

      default:
        return state;
    }
  };

  export default tileReducer;