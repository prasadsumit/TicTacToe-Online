import ActionTypes from './ActionTypes'

export const updateTile = (row, col) => {
    return (dispatch, getState) => {
        const player = getState().player
        dispatch({
            type: ActionTypes.UPDATE_TILE,
            payload: {
                row:row,
                col:col,
                player:player
            },
        })
    }
}

export const resetTile = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESET_TILE })
        dispatch(showWinnerModal(false))
    }
}

export const changePlayer = (player) => {
    return (dispatch, getState) => {
        const isGameFinished = getState().isGameFinished
        if(!isGameFinished) {
            dispatch({
                type: ActionTypes.CHANGE_PLAYER,
                payload: {
                    player: player
                }
            })
        } else {
            dispatch(showWinnerModal(true))
        }
        return null
    }
}

export const runGameLogic = (row, col) => {
    return (dispatch, getState) => {
        const gameState = getState().gameState
        dispatch({
            type: ActionTypes.RUN_GAME_LOGIC,
            payload: {
                row: row,
                col: col,
                gameState:gameState
            }
        })
    }
}

export const showWinnerModal = (value) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SHOW_WINNER_MODAL,
            payload: {
                value: value
            }
        })
    }
}
