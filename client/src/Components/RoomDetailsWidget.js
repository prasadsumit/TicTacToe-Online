import Lobby from './Lobby'
import JoinRoomComponent from './JoinRoomComponent'
import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext'
import { constants } from '../constants'
import { useDispatch } from 'react-redux'
import { showAlert, showWinnerModal, updateRoom } from '../Actions/Actions'
import TextComponent from './TextComponent'

function RoomDetailsWidget(props) {
    const dispatch = useDispatch()
    const maxPlayers = 2
    let { room, userInfo } = props
    const currentPlayers = room.players
    const roomId = room.roomId
    let players = []
    const socket = useContext(SocketContext)
    userInfo = JSON.parse(userInfo)
    const oldSocketId = room.players[userInfo.id].player.socketId
    const [ playerTurnMessage, setPlayerTurnMessage ] = useState('It\'s your turn. Make a move.')

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (socket) {
            const isSocketIdChanged = oldSocketId !== socket.id
            if(isSocketIdChanged) {
                // Emit an event to update the socket ID in the database
                socket.emit(constants.UPDATE_SOCKET_ID, roomId, userInfo.name, userInfo.id)

                // Listen for confirmation that the socket ID was updated
                socket.on(constants.SOCKET_ID_UPDATED, (data) => {
                    console.log('Socket ID updated successfully', data)
                })

                // Clean up listeners when component unmounts
                return () => {
                    socket.off(constants.SOCKET_ID_UPDATED)
                }
            }
            socket.on(constants.ROOM_JOINED, (receivedData) => {
                const alertOptions = {
                    message: `${receivedData.userName} joined the room!`,
                    dismissAfter: 2000,
                    interactive: false,
                    action: null,
                }
                console.log(`${receivedData.userName} joined the room!`)
                dispatch(updateRoom(receivedData.roomId))
                dispatch(showAlert(alertOptions))
            })

            socket.on(constants.DB_UPDATED, (receivedData) => {
                const alertOptions = {
                    message: 'Your Turn!',
                    dismissAfter: 2000,
                    interactive: false,
                    action: null,
                }
                console.log('DB was updated!')
                dispatch(updateRoom(receivedData.roomId))
            })
            socket.on(constants.START_NEW_GAME, (receivedData) => {
                const alertOptions = {
                    message: `New game started by ${ receivedData.userName}`,
                    dismissAfter: 2000,
                    interactive: false,
                    action: null,
                }
                console.log('New game started!')
                dispatch(updateRoom(receivedData.roomId))
                dispatch(showAlert(alertOptions))
                dispatch(showWinnerModal(false))
            })

            return () => {
                socket.off(constants.ROOM_JOINED)
                socket.off(constants.DB_UPDATED)
            }
        }
        return () => {}
    }, [ socket ])

    useEffect(() => {
        if(Object.keys(room.players).length === 2 && !room.isGameFinished) {
            const alertOptions = {
                message: 'Your turn!',
                dismissAfter: 2000,
                interactive: false,
                action: null,
            }
            if (room.playerTurn !== userInfo.id) {
                setPlayerTurnMessage('Wait for your turn.')
            } else {
                dispatch(showAlert(alertOptions))
                setPlayerTurnMessage('It\'s your turn. Make a move.')
            }
        }
    }, [ room.playerTurn ])

    useEffect(() => {
        if(room.isGameFinished) {
            dispatch(showWinnerModal(true))
        }
    }, [ room.isGameFinished ])


    const invitePlayersConfig = {
        info: 'Invite a friend to this room: ',
        placeholder: 'Room ID',
        buttonText: 'Copy',
        roomId: roomId,
    }

    const textStyle = {
        paddingLeft: '0',
        fontSize: '16px',
        marginBottom: '5px',
    }


    Object.keys(currentPlayers).forEach((player) => {
        let playerObj = currentPlayers[player].player
        players.push({
            name: playerObj.userName,
            wins: playerObj.wins,
            draws: playerObj.draws,
            losses: playerObj.losses,
            selected: room.playerTurn === player
        })
    })

    return (
        <div>
            <Lobby players={players}/>
            {
                players.length < maxPlayers && <JoinRoomComponent config={invitePlayersConfig} />
            }
            {
                playerTurnMessage && players.length === maxPlayers && <TextComponent value={playerTurnMessage} style={textStyle}/>
            }
        </div>
    )
}

export default RoomDetailsWidget
