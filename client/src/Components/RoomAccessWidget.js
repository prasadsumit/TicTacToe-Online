import '../Css/Board.css'
import JoinRoomComponent from './JoinRoomComponent'
import ButtonComponent from './ButtonComponent'
import TextComponent from './TextComponent'
import { useDispatch, useSelector } from 'react-redux'
import { showInputModal } from '../Actions/Actions'
import { constants as C } from '../constants'

export default function RoomAccessWidget(props) {
    const style = {
        width: '300px',
        padding: '5px',
        position: 'relative',
        marginTop: '50%',
    }
    const joinRoomConfig = {
        info: 'Join an existing room',
        placeholder: 'Enter room ID',
        buttonText: 'Join',
        onClick: () => {
            alert('Room Joined')
        },
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

    const dispatch = useDispatch()
    const userInfo = useSelector((state) => {
        return state.userInfo
    })

    const createRoom = () => {
        if(userInfo.name === '') {
            dispatch(showInputModal(true, C.CREATE_ROOM))
        }
        // else execute create room logic
        else {
            createRoomLogic()
        }
    }

    const createRoomLogic = () => {
        console.log('Room Created')
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
