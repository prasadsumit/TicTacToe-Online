import React from 'react'
import '../Css/Tile.css'

function TileComponent({ value, onClick, className }) {
    const getIcon = (value) => {
        let icon = null
        if (value === 'x') {
            icon = <span className="material-symbols-outlined fade-in"> close </span>
        } else if (value === '0') {
            icon = <span className="material-symbols-outlined fade-in"> radio_button_unchecked </span>
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
