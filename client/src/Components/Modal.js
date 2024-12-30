import React from 'react'
import '../Css/Modal.css'
import ButtonComponent from './ButtonComponent'

const Modal = ({ modalText, buttonText, onClick }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{modalText}</p>
                <ButtonComponent buttonText={buttonText} onClick={onClick}/>
            </div>
        </div>
    )
}

export default Modal
