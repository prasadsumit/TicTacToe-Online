import React from 'react'
import '../Css/Modal.css'
import ButtonComponent from './ButtonComponent'

const Modal = ({ modalText, buttonText, onClick }) => {
    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            onClick() // Close the modal when clicking the overlay
        }
    }
    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <p style={{ fontSize: '1rem' }}>{modalText}</p>
                <ButtonComponent buttonText={buttonText} onClick={onClick} overrideStyle={{ fontSize: '0.75rem', padding: '0.5rem' }} />
            </div>
        </div>
    )
}

export default Modal
