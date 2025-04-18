import React from 'react'
import '../Css/Tile.css'

function TileComponent({ value, onClick, className }) {
    const getIcon = (value) => {
        let icon = null
        if (value === 'x') {
            icon = <img style={{ height:'100px', width:'100px' }} src={require('../utils/close.png')} />
        } else if (value === '0') {
            icon = <img style={{ height:'120px', width:'120px' }} src={require('../utils/radio-button.png')}/>
        }
        return icon
    }

    return (
        <div onClick={onClick} className={className}>
            {getIcon(value)}
        </div>
    )
}

export default TileComponent
