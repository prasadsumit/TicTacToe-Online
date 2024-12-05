import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import {resetTile } from '../Actions/Actions';

function ModalWrapper(){
    const dispatch = useDispatch()
    const isModalOpen = useSelector(state => state.showWinnerModal)
    const player = useSelector(state => state.player)
   
    const handleResetGame = () => {
        dispatch(resetTile())
    }
  return (
    <div> { 
        isModalOpen ?
        <Modal modalText={`Player ${player} wins`} buttonText={"New game"} onClick={() => handleResetGame()} />
        : <div></div>
        }
    </div>
  )
}

export default ModalWrapper