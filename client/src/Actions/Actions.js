import ActionTypes from './ActionTypes'
import { constants, constants as C } from '../constants'
import { v4 as uuidv4 } from 'uuid'
import { fetchRoomData } from '../utils/requests'
import { getOpponentId, evaluateIndex, isAllNonZeros } from '../utils/helpers'

const resetState = [
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ]
]

export const resetTile = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESET_TILE })
        dispatch(showWinnerModal(false))
        dispatch(resetGame())
    }
}

export const executeGame = (row, col) => {
    return (dispatch, getState) => {
        const playerId = getState().room.playerTurn
        const opponentId = getOpponentId(playerId, getState)
        const tileValue = playerId > opponentId ? 1 : 2
        let gameState = ((currState = getState().room.gameState) => {
            let newGameState = currState.map((row) => {
                return [ ...row ]
            }) // Deep copy of state
            newGameState[row][col] = tileValue
            return newGameState
        })()
        let isGameFinished = evaluateIndex(row, col, gameState)
        let isDraw = isAllNonZeros(gameState)
        let updatedRoom = structuredClone(getState().room)
        updatedRoom = {
            ...updatedRoom,
            gameState: gameState,
            isGameFinished: isGameFinished,
            playerTurn: !isGameFinished ? opponentId : playerId
        }
        if(isGameFinished) {
            updatedRoom.players[playerId].player.wins += 1
            updatedRoom.players[opponentId].player.losses += 1
            updatedRoom.gameState = resetState
        }else if(isDraw) {
            updatedRoom.isGameFinished = true
            updatedRoom.isGameDrawn = true
            let players = Object.keys(updatedRoom.players)
            players.forEach((playerId) => {
                updatedRoom.players[playerId].player.draws += 1
                updatedRoom.gameState = resetState
            })
        }
        dispatch({
            type: ActionTypes.EXECUTE_GAME,
            payload: {
                room: updatedRoom,
                isGameEvent: true,
                isGameFinished: updatedRoom.isGameFinished
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

export const updateGameEvent = (value) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.UPDATE_GAME_EVENT,
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

export const resetGame = (roomId, userInfo, socket) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.RESET_GAME,
            payload: {}
        })
        socket.emit(constants.START_NEW_GAME, roomId, userInfo.name)
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

