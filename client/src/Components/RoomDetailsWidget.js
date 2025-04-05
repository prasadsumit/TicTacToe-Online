import Lobby from './Lobby'
import JoinRoomComponent from './JoinRoomComponent'
import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext'
import { constants, constants as C } from '../constants'
import { useDispatch } from 'react-redux'
import { showAlert, updateRoom } from '../Actions/Actions'
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
    const [ playerTurnMessage, setPlayerTurnMessage ] = useState(null)
    // Handle socket reconnection on component mount or socket change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (socket) {
            const isSocketIdChanged = oldSocketId !== socket.id
            if(isSocketIdChanged) {
                // Emit an event to update the socket ID in the database
                socket.emit(constants.UPDATE_SOCKET_ID, roomId, userInfo.name, userInfo.id)

                // Listen for confirmation that the socket ID was updated
                socket.on(C.SOCKET_ID_UPDATED, (data) => {
                    console.log('Socket ID updated successfully', data)
                })

                // Clean up listeners when component unmounts
                return () => {
                    socket.off(C.SOCKET_ID_UPDATED)
                }
            }
            // Set up event listener for ROOM_JOINED
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

            return () => {
                socket.off(constants.ROOM_JOINED)
            }
        }
        return () => {}
    }, [ socket ])

    useEffect(() => {
        if(room.playerTurn !== userInfo.id) {
            setPlayerTurnMessage('Wait for your turn.')
        } else {
            setPlayerTurnMessage('It\'s your turn. Make a move.')
        }
    }, [ room ])

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
