import '../Css/Board.css'
import JoinRoomComponent from './JoinRoomComponent'
import ButtonComponent from './ButtonComponent'
import TextComponent from './TextComponent'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert, showInputModal, updateRoomId } from '../Actions/Actions'
import { constants, constants as C } from '../constants'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'


export default function RoomAccessWidget(props) {
    const socket = useContext(SocketContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const roomId = useSelector((state) => {
        return state.roomId
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // Set up event listener for ROOM_CREATED
        socket.on(constants.ROOM_CREATED, (receivedData) => {
            const alertOptions = {
                message: `Room created with ID: ${receivedData.roomId}`,
                dismissAfter: 2000,
                interactive: false,
                action: null,
            }
            console.log(`Room created with ID: ${receivedData.roomId}`)
            dispatch(updateRoomId(receivedData.roomId))
            dispatch(showAlert(alertOptions))
        })

        // Set up event listener for ROOM_JOINED
        socket.on(constants.ROOM_JOINED, (receivedData) => {
            console.log(`Room joined with ID: ${receivedData.roomId}`)
            dispatch(updateRoomId(receivedData.roomId))
        })

        socket.on(constants.ROOM_FULL, (receivedData) => {
            const alertOptions = {
                message: 'Couldn\'t join, Room is full!',
                dismissAfter: 2000,
                interactive: false,
                action: null,
            }
            console.log('Couldn\'t join, Room is full!')
            dispatch(showAlert(alertOptions))
        })

        socket.on(constants.ROOM_NOT_FOUND, (receivedData) => {
            const alertOptions = {
                message: `Room ${receivedData.roomId} not found!`,
                dismissAfter: 2000,
                interactive: false,
                action: null,
            }
            console.log(`Room ${receivedData.roomId} not found!`)
            dispatch(showAlert(alertOptions))
        })

        // Clean up event listener when component unmounts
        return () => {
            socket.off(constants.ROOM_CREATED)
            socket.off(constants.ROOM_JOINED)
        }
    }, [ socket ])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if(roomId) {
            navigate(`/tic-tac-toe/room/${roomId}`)
        }
    }, [ roomId ])

    const style = {
        width: '300px',
        padding: '5px',
        position: 'relative',
    }
    let joinRoomConfig = {
        info: 'Join an existing room',
        placeholder: roomId || 'Enter room ID',
        buttonText: 'Join',
    }
    const overrideStyle = {
        textAlign: 'center',
        width: '100%',
        marginLeft: '0',
    }
    const textStyle = {
        margin: '10px 0',
        textAlign: 'center',
        fontSize: '16px',
    }

    const createRoom = () => {
        dispatch(showInputModal(true, C.CREATE_ROOM))
    }

    return (
        <div>
            <div style={style}>
                <ButtonComponent buttonText="Create Room" onClick={createRoom} overrideStyle={overrideStyle}/>
                <TextComponent value="or" style={textStyle}/>
                <JoinRoomComponent config={joinRoomConfig}/>
            </div>
        </div>
    )
}
