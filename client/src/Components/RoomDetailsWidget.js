import Lobby from './Lobby'
import JoinRoomComponent from './JoinRoomComponent'

function RoomDetailsWidget(props) {
    const { room } = props
    const currentPlayers = room.players
    const roomId = room.roomId
    let players = []

    const invitePlayersConfig = {
        info: 'Invite a friend to this room: ',
        placeholder: roomId,
        buttonText: 'Copy'
    }

    Object.keys(currentPlayers).forEach((playerObj) => {
        players.push({
            name: currentPlayers[playerObj].player.userName,
            wins: 3,
            draws: 0,
            losses: 1,
            selected: true
        })
    })

    return (
        <div>
            <Lobby lobbyNumber={1} players={players}/>
            <JoinRoomComponent config={invitePlayersConfig}/>
        </div>
    )
}

export default RoomDetailsWidget
