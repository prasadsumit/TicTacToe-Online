import ActionTypes from '../Actions/ActionTypes'
import initialState from '../Store/initialState'

const resetState = [
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
]

const evaluateIndex = (row, col, gameState) => {
    if (!gameState || !Array.isArray(gameState) || !Array.isArray(gameState[0])) {
        throw new Error('Invalid gameState structure')
    }

    if (
        row < 0 ||
		row >= gameState.length ||
		col < 0 ||
		col >= gameState[row].length
    ) {
        throw new Error(`Invalid row or col: row=${row}, col=${col}`)
    }

    let value = gameState[row][col]

    // left-diagonal
    if (row === col) {
        console.log('left diagonal')
        let compareArr = [
            gameState[0][0],
            gameState[1][1],
            gameState[2][2],
        ]
        compareArr = compareArr.map((el) => {
            return el === value
        })
        if(compareArr.indexOf(false) === -1) {
            return true
        }
    }
    // right-diagonal
    if(row + col === 2) {
        console.log('right diagonal')
        let compareArr = [
            gameState[0][2],
            gameState[1][1],
            gameState[2][0],
        ]
        compareArr = compareArr.map((el) => {
            return el === value
        })
        if(compareArr.indexOf(false) === -1) {
            return true
        }
    }

    // row-traverse
    console.log('row traverse')
    let isRowMatch = true
    for(let i = 0; i < 3; i++) {
        if(gameState[row][i] !== value) {
            isRowMatch = false
            break
        }
    }

    if(isRowMatch) {
        return true
    }
    // col-traverse
    console.log('col traverse')
    let isColMatch = true
    for(let j = 0; j < 3; j++) {
        if(gameState[j][col] !== value) {
            isColMatch = false
            break
        }
    }

    if(isColMatch) {
        return true
    }

    return false
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.RESET_TILE:
        return {
            ...state,
            gameState: resetState
        }

    case ActionTypes.EXECUTE_GAME:
        return {
            ...state,
            showWinnerModal: action.payload.isGameFinished,
            room: action.payload.room,
            isGameEvent: action.payload.isGameEvent
        }


    case ActionTypes.SHOW_WINNER_MODAL:
        return {
            ...state,
            showWinnerModal: action.payload.value
        }

    case ActionTypes.SHOW_INPUT_MODAL:
        return {
            ...state,
            inputModal: {
                showInputModal: action.payload.value,
                submitAction: action.payload.submitAction,
                inputRoomId: action.payload.roomId,
            }
        }

    case ActionTypes.UPDATE_USERINFO:
        return {
            ...state,
            userInfo: action.payload.userInfo
        }

    case ActionTypes.UPDATE_ROOM_ID:
        return {
            ...state,
            roomId: action.payload.roomId
        }

    case ActionTypes.UPDATE_GAME_EVENT:
        return {
            ...state,
            isGameEvent: action.payload.value
        }

    case ActionTypes.RESET_GAME: {
        let room = action.payload.room
        let updatedRoom = {
            ...state.room,
            isGameFinished: false
        }
        return {
            ...state,
            room: updatedRoom
        }
    }

    case ActionTypes.UPDATE_ROOM:
        return {
            ...state,
            room: action.payload.room
        }

    case ActionTypes.SHOW_ALERT:
        return {
            ...state,
            alertOptions: {
                visible: true,
                interactive: action.payload.interactive,
                message: action.payload.message,
                action: action.payload.action,
                dismissAfter: action.payload.dismissAfter
            }
        }

    case ActionTypes.CLOSE_ALERT:
        return {
            ...state,
            alertOptions: {
                visible: false,
                interactive: null,
                message: '',
                action: null,
                dismissAfter: null
            }
        }

    default:
        return state
    }
}

export default Reducer

