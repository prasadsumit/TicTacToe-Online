import React from 'react'
import GridComponent from '../Components/GridComponent'
import TextComponent from '../Components/TextComponent'

function Homepage() {
  return (
    <div>
      <GridComponent />
      <TextComponent value={1} />
    </div>
  )
}

export default Homepage