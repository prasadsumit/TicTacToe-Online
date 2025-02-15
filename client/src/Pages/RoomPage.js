import React from 'react'
import TextComponent from '../Components/TextComponent'
import ModalWrapper from '../Components/ModalWrapper'
import BoardComponent from '../Components/BoardComponent'
import SideBarComponent from '../Components/SidebarComponent'
import Lobby from '../Components/Lobby'
import JoinRoomComponent from '../Components/JoinRoomComponent'


function RoomPage() {
    const pageTitle = 'tic-tac-toe'

    const pageStyle = {
        padding: '4rem',
    }
    const subPageStyle = {
        padding: '100px',
        display: 'flex',
        justifyContent: 'center',
        gap: '400px',
        marginTop: '100px',
    }
    const padding = '1rem'
    const titleSize = '1rem'

    const players = [
        { name: 'radioMAN', wins: 3, draws: 0, losses: 1, selected: false },
        { name: 'divinE', wins: 1, draws: 0, losses: 3, selected: true },
    ]

    const invitePlayersConfig = {
        info: 'Invite a friend to this room: ',
        placeholder: '#fghajdjh',
        buttonText: 'Copy',
        onClick: () => {
            alert('Copied to clipboard!')
        },
    }

    return (
        <div style={pageStyle}>
            <ModalWrapper />
            <TextComponent value={pageTitle} padding={padding} size={titleSize}/>
            <div style={subPageStyle}>
                <BoardComponent/>
                <div>
					 <Lobby lobbyNumber={1} players={players}/>
					 <JoinRoomComponent config={invitePlayersConfig} />
                </div>
            </div>
            <SideBarComponent/>
        </div>
    )
}

export default RoomPage
