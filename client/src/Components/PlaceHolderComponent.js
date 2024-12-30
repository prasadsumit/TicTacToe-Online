import '../Css/Board.css'
import RoomAccessWidget from './RoomAccessWidget'
import ButtonComponent from './ButtonComponent'
import TextComponent from './TextComponent'

export default function PlaceHolderComponent(props) {
    const style = {
        width: '300px',
        padding: '5px',
    }
    const roomAccessConfig = {
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
        <div style={style}>
            <ButtonComponent buttonText="Create Room" onClick={props.onClick} overrideStyle = {overrideStyle}/>
            <TextComponent value="or" style={textStyle}/>
            <RoomAccessWidget config={roomAccessConfig} />
        </div>
    )
}
