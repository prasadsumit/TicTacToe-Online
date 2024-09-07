import React from 'react'
import GridComponent from '../Components/GridComponent'
import TextComponent from '../Components/TextComponent'
import { useSelector } from 'react-redux'
import ButtonComponent from '../Components/ButtonComponent'

function Homepage() {

  const player = useSelector((state) => state.player)

  return (
    <div>
      <GridComponent />
      <TextComponent value={player} />
      <ButtonComponent />
    </div>
  )
}

export default Homepage