import React, { useState } from 'react'
import { io } from 'socket.io-client'
import { constants } from './constants'

// Connect to Socket.IO server
const socket = io('http://localhost:5000')
socket.on('connect', () => {
    document.title = `Player: ${socket.id}`
})

const Socket = () => {
    const [ roomId, setRoomId ] = useState('')
    const [ userName, setUserName ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ uuid, setUUID ] = useState('')


    const createRoom = () => {
        socket.emit(constants.CREATE_ROOM, userName, uuid)
    }

    socket.on(constants.ROOM_CREATED, () => {
        setMessage('Room created')
    })

    const joinRoom = () => {
        socket.emit(constants.JOIN_ROOM, roomId, userName, uuid, (response) => {
            if (response.success) {
                setMessage(`Joined room: ${roomId}`)
            } else {
                setMessage(response.message)
            }
        })
    }
    const dbRequest = () => {
        // GET request
        // const response = fetch('http://localhost:3030/rooms/?id=1', {
        //     method: 'GET',
        // }).then((response) => {
        //     return response.json()
        // }).then((data) => {
        //     console.log(data)
        // })
    }


    return (
        <div>
            <h1>Socket.IO Tic Tac Toe</h1>

            <div>
                <input
                    type="text"
                    placeholder="Room Name"
                    value={roomId}
                    onChange={(e) => {
                        return setRoomId(e.target.value)
                    }}
                />
                <button onClick={createRoom}>Create Room</button>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => {
                        return setUserName(e.target.value)
                    }}
                />
                <button onClick={joinRoom}>Join Room</button>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="UUID"
                    value={uuid}
                    onChange={(e) => {
                        return setUUID(e.target.value)
                    }}
                />
            </div>

            <div>
                <button onClick={dbRequest}>DB Request</button>
            </div>

            <p>{message}</p>
        </div>
    )
}

export default Socket
