import React from 'react'
import TileComponent from './TileComponent'

function GridComponent() {
    const gridStyle = {
        display: "grid",
        "grid-template-columns": "4fr 4fr 4fr",
        width: "40%"
    }
  return (
    <div style={gridStyle} >
        <TileComponent value={"x"} />
        <TileComponent value={"x"} />
        <TileComponent value={"x"} />
        <TileComponent value={"x"} />
        <TileComponent value={"x"} />
        <TileComponent value={"x"} />
        <TileComponent value={"x"} />
        <TileComponent value={"x"} />
        <TileComponent value={"x"} />
    </div>
  )
}

export default GridComponent