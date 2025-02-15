import ActionTypes from '../Actions/ActionTypes'
import initialState from '../Store/initialState'

const initialWinnerModalState = initialState.showWinnerModal

const winnerModalReducer = (state = initialWinnerModalState, action) => {
    switch (action.type) {
    case ActionTypes.SHOW_WINNER_MODAL:
        return action.payload.value

    default:
        return state
    }
}

export default winnerModalReducer
