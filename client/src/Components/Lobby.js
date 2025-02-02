import React from 'react'
import '../Css/Lobby.css'
import PlayerList from './PlayerList'

const Lobby = ({ lobbyNumber, players }) => {
    return (
        <div className="lobby-container">
            <h2 className="lobby-header">LOBBY - {lobbyNumber}</h2>
            <PlayerList players={players} />
        </div>
    )
}

export default Lobby
