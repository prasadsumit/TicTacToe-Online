import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import { resetGame, resetTile, showWinnerModal } from '../Actions/Actions'
import { useContext, useEffect } from 'react'
import { isAllNonZeros } from '../utils/helpers'
import { SocketContext } from '../context/SocketContext'

function ModalWrapper() {
    const dispatch = useDispatch()
    const socket = useContext(SocketContext)
    const isModalOpen = useSelector((state) => {
        return state.showWinnerModal
    })
    const room = useSelector((state) => {
        return state.room
    })
    const userInfo = useSelector((state) => {
        return state.userInfo
    })
    let playerId = isModalOpen ? room.playerTurn : null
    let winner = playerId ? room.players[playerId].player.userName : null
    let modalText = `${winner} wins 🥳`
    if(room) {
        let isDraw = !room.isGameFinished && isAllNonZeros(room.gameState)
        if(isDraw) {
            modalText = 'Draw! 🟡'
        }
    }

    const handleResetGame = () => {
        // dispatch(resetTile())
        dispatch(resetGame(room.roomId, userInfo, socket))
        dispatch(showWinnerModal(false))
    }
    return (
        <div> {
            isModalOpen ?
                <Modal modalText={modalText} buttonText={'New game'} onClick={() => {
                    return handleResetGame()
                }} /> :
                <div></div>
        }
        </div>
    )
}

export default ModalWrapper
