import React from 'react'

const PlayerRow = ({ player }) => {
    return (
        <div className={`player-row ${player.selected ? 'selected' : ''}`}>
            <span>{player.name}</span>
            <span>{player.wins}</span>
            <span>{player.draws}</span>
            <span>{player.losses}</span>
        </div>
    )
}

export default PlayerRow
