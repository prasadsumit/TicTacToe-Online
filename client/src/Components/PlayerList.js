import React from 'react'
import PlayerRow from './PlayerRow'

const PlayerList = ({ players }) => {
    return (
        <div className="player-list">
            <div className="player-header">
                <span> </span>
                <span>W</span>
                <span>D</span>
                <span>L</span>
            </div>
            {players.map((player, index) => {
                return <PlayerRow key={index} player={player} />
            }
            )}
        </div>
    )
}

export default PlayerList
