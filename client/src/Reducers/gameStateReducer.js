import ActionTypes from "../Actions/ActionTypes";
import initialState from "../Store/initialState";

const resetState = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const initialGameState = initialState.gameState;

const gameStateReducer = (state = initialGameState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_TILE: {
      let newGameState = state.map((row) => [...row]); // Deep copy of state
      const { row, col, player } = action.payload;
      newGameState[row][col] = player;
      return newGameState; 
    }

    case ActionTypes.RESET_TILE:
      return resetState; 

    default:
      return state;
  }
};

export default gameStateReducer;
