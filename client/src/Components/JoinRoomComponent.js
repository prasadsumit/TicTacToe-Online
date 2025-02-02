import ButtonComponent from './ButtonComponent'
import TextComponent from './TextComponent'
import '../Css/RoomAccessWidget.css'

function JoinRoomComponent(props) {
    const { config } = props
    const textStyle = {
        paddingLeft: '0',
        fontSize: '16px',
        marginBottom: '0',
    }
    const inputStyle = {
        padding: '5px',
        border: 'solid 1px black',
        borderRadius: '5px',
        fontSize: '14px',
        fontFamily: 'JetBrains Mono',
        width: '80%',
    }
    const containerStyle = {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    }
    return (
        <div>
            <TextComponent value={config.info} style={textStyle} />
            <div style={containerStyle}>
                <input type="text" id="roominputfield" name="roomid" placeholder={config.placeholder} style={inputStyle}/>
                <ButtonComponent buttonText={config.buttonText} onClick={config.onClick}/>
            </div>

        </div>
    )
}

export default JoinRoomComponent
