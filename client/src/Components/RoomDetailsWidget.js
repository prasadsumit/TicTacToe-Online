import Lobby from './Lobby'
import JoinRoomComponent from './JoinRoomComponent'

function RoomDetailsWidget(props) {
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
        <div>
            <Lobby lobbyNumber={1} players={players}/>
            <JoinRoomComponent config={invitePlayersConfig}/>
        </div>
    )
}

export default RoomDetailsWidget
