import React from 'react'
import { useDispatch } from 'react-redux'
import { resetTile } from '../Actions/Actions'

function ButtonComponent() {

    const dispatch = useDispatch()
    const handleResetGame = () => {
        dispatch(resetTile())
    }

  return (
    <div>
        <button onClick={() => handleResetGame()}>New game</button>
    </div>
  )
}

export default ButtonComponent