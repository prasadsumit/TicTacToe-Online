import React from 'react'

function TileComponent({value,onClick}) {
    const itemStyle = {
        padding: "20px",
        border: "2px solid red",
        "font-size": "50px"
    }

    const paraStyle = {
        margin: "0",
        "text-align": "center"
    }
  return (
    <div onClick={onClick} style={itemStyle}>
        <p style={paraStyle}>{value}</p>
    </div>
  )
}

export default TileComponent