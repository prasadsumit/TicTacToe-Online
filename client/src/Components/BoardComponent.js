import '../Css/Board.css'
import { useDispatch, useSelector } from 'react-redux'
import { useRunGame } from '../Middleware/RunGame'
import TileComponent from './TileComponent'
import store from '../Store/store'
import { showAlert, updateRoom } from '../Actions/Actions'

export default function BoardComponent(props) {
    const gameState = useSelector((state) => {
        return state.gameState
    })
    const runGame = useRunGame()
    const room = useSelector((state) => state.room)
    const userInfo = useSelector((state) => state.userInfo)
    const dispatch = useDispatch()

    // Utility function to apply CSS classes based on square position
    function getSquareClasses(rowIndex, colIndex) {
        const classes = [ 'no-select' ]
        if(rowIndex === 0) {
            classes.push('top')
        }
        if(rowIndex === 2) {
            classes.push('bottom')
        }
        if(colIndex === 0) {
            classes.push('left')
        }
        if(colIndex === 2) {
            classes.push('right')
        }
        return classes.join(' ')
    }

    const handleClick = (rowIndex, colIndex) => {
        console.log('inside handleClick')
        if(!userInfo || !room) {
            dispatch(showAlert({
                message: 'Please create a room to start playing',
                dismissAfter: 2000,
                interactive: false,
                action: null,
            }))
            return
        }
        if(userInfo.id !== room.playerTurn) {
            dispatch(showAlert({
                message: 'Please wait for your turn',
                dismissAfter: 2000,
                interactive: false,
                action: null,
            }))
            return
        }

        const isTileEmpty = gameState[rowIndex][colIndex] === 0
        const isGameFinished = store.getState().isGameFinished
        if(isTileEmpty && !isGameFinished) {
            runGame(rowIndex, colIndex)
        }
        console.log('currentState', store.getState())
    }

    const symbolMap = {
        0: '',
        1: 'x',
        2: '0',
    }
    return (
        <div className="game-board" style={props.style}>
            {
                gameState.map((el, rowIndex) => {
                    return el.map((val, colIndex) => {
                        return <TileComponent
                            key = {`${rowIndex}-${colIndex}`}
                            className = {`square ${getSquareClasses(rowIndex, colIndex)}`}
                            value={symbolMap[val]}
                            onClick={() => {
                                return handleClick(rowIndex, colIndex)
                            }}
                        />
                    })
                })
            }
        </div>
    )
}
