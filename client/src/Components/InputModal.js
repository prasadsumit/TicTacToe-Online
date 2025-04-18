import React, { useContext, useEffect, useRef, useState } from 'react'
import '../Css/Modal.css'
import ButtonComponent from './ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import { evaluateAction, showInputModal, updateUserInfo } from '../Actions/Actions'
import { constants as C } from '../constants'
import { SocketContext } from '../context/SocketContext'


const InputModal = ({ modalText, handleOverlayClick }) => {
    const socket = useContext(SocketContext)
    const inputRef = useRef(null)
    const fieldLabelStyle = {
        fontSize: '14px',
        margin: '0 0 5px',
        textAlign: 'left',
    }

    const [ inputValue, setInputValue ] = useState('')
    const submitOperation = useSelector((state) => {
        return state.inputModal.submitAction
    })
    const userInfo = useSelector((state) => {
        return state.userInfo
    })
    const inputRoomId = useSelector((state) => {
        return state.inputModal.inputRoomId
    })

    const dispatch = useDispatch()
    const submitAction = () => {
        // dispatch action to submit input
        if(inputValue !== '') {
            dispatch(evaluateAction(submitOperation, inputValue, inputRoomId, socket))
        }else{
            console.log('Please enter a valid name')
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <p style={fieldLabelStyle}>{modalText}</p>
                <div className="input-fields">
                    <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => {
                            return setInputValue(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                submitAction()
                            }
                        }}
                    />
                    <ButtonComponent buttonText={'Submit'} onClick={submitAction}/>
                </div>
            </div>
        </div>
    )
}

export default InputModal
