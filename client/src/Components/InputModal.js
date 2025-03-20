import React, { useState } from 'react'
import '../Css/Modal.css'
import ButtonComponent from './ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import { showInputModal, updateUserInfo } from '../Actions/Actions'
import { constants as C } from '../constants'

const InputModal = ({ modalText, handleOverlayClick }) => {
    const fieldLabelStyle = {
        fontSize: '14px',
        margin: '0 0 5px',
        textAlign: 'left',
    }

    const [ inputValue, setInputValue ] = useState('')
    const submitOperation = useSelector((state) => {
        return state.inputModal.submitAction
    })

    const dispatch = useDispatch()
    const submitAction = () => {
        // dispatch action to submit input
        if(inputValue !== '') {
            dispatch(updateUserInfo(inputValue))
            dispatch(showInputModal(false, null))
            if(submitOperation === C.CREATE_ROOM) {
                createRoomLogic()
            }else if(submitOperation === C.JOIN_ROOM) {
                joinRoomLogic()
            }
        }
    }

    const createRoomLogic = () => {
        console.log('Room Created through submit')
    }

    const joinRoomLogic = () => {
        console.log('Room Joined through submit')
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <p style={fieldLabelStyle}>{modalText}</p>
                <div className="input-fields">
                    <input
                        value={inputValue}
                        onChange={(e) => {
                            return setInputValue(e.target.value)
                        }}
                    />
                    <ButtonComponent buttonText={'Submit'} onClick={submitAction}/>
                </div>
            </div>
        </div>
    )
}

export default InputModal
