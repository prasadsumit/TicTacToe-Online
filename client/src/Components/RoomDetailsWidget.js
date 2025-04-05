import Lobby from './Lobby'
import JoinRoomComponent from './JoinRoomComponent'
import { useContext, useEffect } from 'react'
import { SocketContext } from '../context/SocketContext'
import { constants, constants as C } from '../constants'
import { useDispatch } from 'react-redux'
import { showAlert, updateRoom } from '../Actions/Actions'

function RoomDetailsWidget(props) {
    const dispatch = useDispatch()
    let { room, userInfo } = props
    const currentPlayers = room.players
    const roomId = room.roomId
    let players = []
    const socket = useContext(SocketContext)
    userInfo = JSON.parse(userInfo)
    const oldSocketId = room.players[userInfo.id].player.socketId
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

    const invitePlayersConfig = {
        info: 'Invite a friend to this room: ',
        placeholder: 'Room ID',
        buttonText: 'Copy',
        roomId: roomId,
    }

    Object.keys(currentPlayers).forEach((playerObj) => {
        players.push({
            name: currentPlayers[playerObj].player.userName,
            wins: 3,
            draws: 0,
            losses: 1,
            selected: true
        })
    })

    return (
        <div>
            <Lobby players={players}/>
            <JoinRoomComponent config={invitePlayersConfig}/>
        </div>
    )
}

export default RoomDetailsWidget
