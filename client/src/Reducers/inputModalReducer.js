import ActionTypes from '../Actions/ActionTypes'
import initialState from '../Store/initialState'

const initialInputModalState = initialState.inputModal

const inputModalReducer = (state = initialInputModalState, action) => {
    switch (action.type) {
    case ActionTypes.SHOW_INPUT_MODAL:
        return {
            showInputModal: action.payload.value,
            submitAction: action.payload.submitAction,
        }

    default:
        return state
    }
}

export default inputModalReducer
