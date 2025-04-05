import ActionTypes from './ActionTypes'
import { constants, constants as C } from '../constants'
import { v4 as uuidv4 } from 'uuid'
import { fetchRoomData } from '../utils/requests'

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
        dispatch(resetGame())
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

export const showInputModal = (value, submitAction, roomId = null) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SHOW_INPUT_MODAL,
            payload: {
                value: value,
                submitAction: submitAction,
                roomId: roomId,
            }
        })
    }
}


export const updateUserInfo = (userInfo) => {
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    return (dispatch) => {
        dispatch({
            type: ActionTypes.UPDATE_USERINFO,
            payload: {
                userInfo: userInfo
            }
        })
    }
}

export const initUserInfo = () => {
    let userInfo = sessionStorage.getItem('userInfo')
    return (dispatch) => {
        if(userInfo) {
            dispatch({
                type: ActionTypes.UPDATE_USERINFO,
                payload: {
                    userInfo: JSON.parse(userInfo)
                }
            })
        }
    }
}

export const resetGame = () => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.RESET_GAME,
            payload: {}
        })
    }
}

export const createRoom = (userInfo, socket) => {
    socket.emit(constants.CREATE_ROOM, userInfo.name, userInfo.id)
    return (dispatch) => {
        dispatch(showInputModal(false, null))
    }
}

export const joinRoom = (roomId, userInfo, socket) => {
    socket.emit(constants.JOIN_ROOM, roomId, userInfo.name, userInfo.id)
    return (dispatch) => {
        dispatch(showInputModal(false, null))
    }
}

export const evaluateAction = (action, userName, roomId, socket) => {
    return async(dispatch) => {
        let uuid = uuidv4()
        let userInfo = {
            name: userName,
            id: uuid
        }
        if (action === C.CREATE_ROOM) {
            await dispatch(createRoom(userInfo, socket))
            dispatch(updateUserInfo(userInfo))
        } else if (action === C.JOIN_ROOM) {
            await dispatch(joinRoom(roomId, userInfo, socket))
            dispatch(updateUserInfo(userInfo))
        }
    }
}

export const updateRoomId = (roomId) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.UPDATE_ROOM_ID,
            payload: {
                roomId: roomId
            }
        })
    }
}

export const updateRoom = (roomId) => {
    return async(dispatch) => {
        try {
            const room = await fetchRoomData(roomId)
            dispatch({
                type: ActionTypes.UPDATE_ROOM,
                payload: {
                    room: room
                }
            })
        } catch (error) {
            console.log('Failed to update room:', error)
        }
    }
}

export const showAlert = (alertOptions) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SHOW_ALERT,
            payload: {
                ...alertOptions
            }
        })
    }
}

export const closeAlert = () => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.CLOSE_ALERT,
            payload: {}
        })
    }
}

