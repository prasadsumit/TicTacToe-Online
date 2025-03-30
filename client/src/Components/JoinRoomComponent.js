import ButtonComponent from './ButtonComponent'
import TextComponent from './TextComponent'
import '../Css/RoomAccessWidget.css'
import { useState } from 'react'
import { showInputModal } from '../Actions/Actions'
import { useDispatch, useSelector } from 'react-redux'
import { constants as C } from '../constants'

function JoinRoomComponent(props) {
    const { config } = props
    const textStyle = {
        paddingLeft: '0',
        fontSize: '16px',
        marginBottom: '5px',
    }
    const inputStyle = {
        padding: '5px',
        border: 'solid 1px black',
        borderRadius: '5px',
        fontSize: '14px',
        fontFamily: 'JetBrains Mono',
        width: '80%',
    }
    const containerStyle = {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    }
    const [ inputValue, setInputValue ] = useState('')


    const dispatch = useDispatch()
    const userInfo = useSelector((state) => {
        return state.userInfo
    })

    const joinRoom = () => {
        if(inputValue === '') {
            alert('Please enter a room ID')
            return
        }
        if(userInfo.name === '') {
            dispatch(showInputModal(true, C.JOIN_ROOM))
        }else{
            joinRoomLogic()
        }
    }

    const joinRoomLogic = () => {
        console.log('Room Joined')
    }


    return (
        <div>
            <TextComponent value={config.info} style={textStyle} />
            <div style={containerStyle}>
                <input
                    type="text"
                    id="roominputfield"
                    name="roomid"
                    placeholder={config.placeholder}
                    style={inputStyle}
                    value={inputValue}
                    onChange={(e) => {
                        return setInputValue(e.target.value)
                    }}
                />
                <ButtonComponent buttonText={config.buttonText} onClick={config.onClick}/>
            </div>

        </div>
    )
}

export default JoinRoomComponent
