import '../Css/Board.css'
import JoinRoomComponent from './JoinRoomComponent'
import ButtonComponent from './ButtonComponent'
import TextComponent from './TextComponent'

export default function RoomAccessWidget(props) {
    const style = {
        width: '300px',
        padding: '5px',
        position: 'relative',
        marginTop: '50%',
    }
    const joinRoomConfig = {
        info: 'Join an existing room',
        placeholder: 'Enter room ID',
        buttonText: 'Join',
        onClick: () => {
            alert('Room Joined')
        },
    }
    const overrideStyle = {
        textAlign: 'center',
        width: '100%',
        marginLeft: '0',
    }
    const textStyle = {
        margin: '10px 0',
        textAlign: 'center',
        fontSize: '16px',
    }
    return (
        <div>
            <div style={style}>
                <ButtonComponent buttonText="Create Room" onClick={props.onClick} overrideStyle={overrideStyle}/>
                <TextComponent value="or" style={textStyle}/>
                <JoinRoomComponent config={joinRoomConfig}/>
            </div>
        </div>
    )
}
