import ButtonComponent from './ButtonComponent'
import TextComponent from './TextComponent'
import '../Css/RoomAccessWidget.css'
import { useRef, useState } from 'react'
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
    const inputRef = useRef(null)

    const dispatch = useDispatch()
    const userInfo = useSelector((state) => {
        return state.userInfo
    })

    const joinRoom = () => {
        if (inputRef.current) {
            let inputRoomId = inputRef.current.value
            dispatch(showInputModal(true, C.JOIN_ROOM, inputRoomId))
        }
    }

    const copyToClipBoard = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.value)
                .then(() => {
                    return alert('Copied to clipboard!')
                })
                .catch((err) => {
                    return console.error('Failed to copy: ', err)
                })
        }
    }

    const btnAction = () => {
        if(config.buttonText === 'Join') {
            joinRoom()
        }else if(config.buttonText === 'Copy') {
            copyToClipBoard()
        }
    }

    if(config.buttonText === 'Copy') {
        inputStyle.pointerEvents = 'none'
        inputStyle.color = '#888'
    }
    return (
        <div>
            <TextComponent value={config.info} style={textStyle} />
            <div style={containerStyle}>
                <input
                    ref={inputRef}
                    type="text"
                    id="roominputfield"
                    name="roomid"
                    placeholder={config.placeholder}
                    style={inputStyle}
                    value={config.roomId}
                    readOnly={config.buttonText === 'Copy'}
                />
                <ButtonComponent buttonText={config.buttonText} onClick={btnAction}/>
            </div>

        </div>
    )
}

export default JoinRoomComponent
