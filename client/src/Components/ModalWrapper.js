import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import { resetTile } from '../Actions/Actions'
import { useEffect } from 'react'

function ModalWrapper() {
    const dispatch = useDispatch()
    const isModalOpen = useSelector((state) => {
        return state.showWinnerModal
    })
    const room = useSelector((state) => {
        return state.room
    })
    let playerId = isModalOpen ? room.playerTurn : null
    let winner = playerId ? room.players[playerId].player.userName : null

    const handleResetGame = () => {
        dispatch(resetTile())
    }
    return (
        <div> {
            isModalOpen ?
                <Modal modalText={`${winner} wins 🥳`} buttonText={'New game'} onClick={() => {
                    return handleResetGame()
                }} /> :
                <div></div>
        }
        </div>
    )
}

export default ModalWrapper
