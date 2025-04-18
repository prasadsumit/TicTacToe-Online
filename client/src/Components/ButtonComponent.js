
function ButtonComponent({ buttonText, onClick, overrideStyle }) {
    const style = {
        background: 'black',
        color: 'white',
        borderRadius: '5px',
        marginLeft: '5px',
        fontFamily: 'JetBrains Mono',
        padding: '4px',
        fontSize: '14px',
        ...overrideStyle,
    }
    return (
        <button style={style} onClick={onClick}>{buttonText}</button>
    )
}
export default ButtonComponent
