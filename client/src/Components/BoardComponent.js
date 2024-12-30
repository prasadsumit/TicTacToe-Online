import '../Css/Board.css'

export default function BoardComponent(props) {
    return (
        <div className="game-board">
            <div className="square top left"></div>
            <div className="square top"></div>
            <div className="square top right"></div>
            <div className="square left"></div>
            <div className="square"></div>
            <div className="square right"></div>
            <div className="square bottom left"></div>
            <div className="square bottom"></div>
            <div className="square bottom right"></div>
        </div>
    )
}
