import React from 'react'
import GridComponent from '../Components/GridComponent'
import TextComponent from '../Components/TextComponent'
import { useSelector } from 'react-redux'
import ModalWrapper from '../Components/ModalWrapper'

function Homepage() {

  const player = useSelector((state) => state.player)

  return (
    <div>
      <GridComponent />
      <TextComponent value={player} />
      <ModalWrapper />
    </div>
  )
}

export default Homepage