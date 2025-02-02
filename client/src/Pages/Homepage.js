import React, { useState } from 'react'
import GridComponent from '../Components/GridComponent'
import TextComponent from '../Components/TextComponent'
import { useSelector } from 'react-redux'
import ModalWrapper from '../Components/ModalWrapper'
import BoardComponent from '../Components/BoardComponent'
import PlaceholderComponent from '../Components/PlaceholderComponent'
import Modal from '../Components/Modal'


function Homepage() {
    const player = useSelector((state) => {
        return state.player
    })
    const [ isModalOpen, setIsModalOpen ] = useState(false)

    const openModal = () => {
        return setIsModalOpen(true)
    }
    const closeModal = () => {
        return setIsModalOpen(false)
    }
    const pageTitle = 'tic-tac-toe'

    const pageStyle = {
        padding: '4rem',
    }
    const subPageStyle = {
        padding: '100px',
        display: 'flex',
        justifyContent: 'center',
        gap: '400px',
        marginTop: '100px',
    }
    const padding = '1rem'
    const titleSize = '1rem'

    return (
        <div style={pageStyle}>
            {/* <GridComponent />*/}
            {/* <TextComponent value={`Player ${player} turn`} />*/}
            {/* <ModalWrapper />*/}

            <TextComponent value={pageTitle} padding={padding} size={titleSize}/>
            <div style={subPageStyle}>
                <BoardComponent/>
                <PlaceholderComponent/>
                <button onClick={openModal}>Open Modal</button>
                {isModalOpen &&
                    <Modal
                        modalText="🥳 radioMAN wins!"
                        buttonText="Play again!"
                        onClick={closeModal}
                    />
                }
            </div>

        </div>
    )
}

export default Homepage
