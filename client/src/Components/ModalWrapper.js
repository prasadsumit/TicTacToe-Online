import { useEffect, useState } from 'react';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import {resetTile } from '../Actions/Actions';

function ModalWrapper(){
    const dispatch = useDispatch()
    const [isModalOpen, setModalOpen] = useState(false);
    const isGameFinished = useSelector(state => state.isGameFinished)
    const player = useSelector(state => state.player)
    
    useEffect(() => {
        handleModalUpdate();
      });
    
    const handleModalUpdate = () => {
        if (isGameFinished) 
            setModalOpen(true);
    }

    const handleResetGame = () => {
        dispatch(resetTile())
        setModalOpen(false)
    }
  return (
    <div> { 
        isModalOpen ?
        <Modal modalText={`Player ${player} wins`} buttonText={"New game"} onClick={() => handleResetGame()} />
        // <p>hello</p>
        : <div></div>
        }
    </div>
  )
}

export default ModalWrapper