import ActionTypes from "../Actions/ActionTypes";
import initialState from "../Store/initialState";

const initialPlayerState = initialState.player;

const playerReducer = (state = initialPlayerState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PLAYER:
      return action.payload.player !== -1 
        ? action.payload.player 
        : (state === 1 ? 2 : 1);

    default:
      return state;
  }
};

export default playerReducer;
