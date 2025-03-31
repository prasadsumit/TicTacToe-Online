import '../Css/Board.css'
import JoinRoomComponent from './JoinRoomComponent'
import ButtonComponent from './ButtonComponent'
import TextComponent from './TextComponent'
import { useDispatch, useSelector } from 'react-redux'
import { showInputModal, updateRoomId } from '../Actions/Actions'
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
    useEffect(() => {
        if(roomId) {
            navigate(`/tic-tac-toe/room/${roomId}`)
        }
    }, [ roomId ])

    socket.on('connect', () => {
        document.title = `Player: ${socket.id}`
    })

    socket.on(constants.ROOM_CREATED, (receivedData) => {
        console.log(`Room created with ID: ${receivedData.roomId}`)
        dispatch(updateRoomId(receivedData.roomId))
    })

    socket.on(constants.ROOM_JOINED, (receivedData) => {
        console.log(`Room joined with ID: ${receivedData.roomId}`)
        dispatch(updateRoomId(receivedData.roomId))
    })


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

    const userInfo = useSelector((state) => {
        return state.userInfo
    })

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
