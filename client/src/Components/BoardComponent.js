import '../Css/Board.css'
import { useDispatch, useSelector } from 'react-redux'
import TileComponent from './TileComponent'
import { executeGame, showAlert, updateGameEvent } from '../Actions/Actions'
import { SocketContext } from '../context/SocketContext'
import { useContext, useEffect } from 'react'
import { constants as C } from '../constants'

export default function BoardComponent(props) {
    const room = useSelector((state) => state.room)
    const userInfo = useSelector((state) => state.userInfo)
    const dispatch = useDispatch()
    const socket = useContext(SocketContext)
    const isGameEvent = useSelector((state) => state.isGameEvent)
    let dummyGameState = [
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
    ]
    let gameState = dummyGameState
    if(room && room.gameState) {
        gameState = room.gameState
    }

    useEffect(() => {
        if(room && isGameEvent) {
            socket.emit(C.UPDATE_DB, room)
            dispatch(updateGameEvent(false))
        }
    }, [ isGameEvent ])

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
                message: 'Please create a room to start playing!',
                dismissAfter: 2000,
                interactive: false,
                action: null,
            }))
            return
        }
        if(Object.keys(room.players).length < 2) {
            dispatch(showAlert({
                message: 'You need two players to play. Invite a friend!',
                dismissAfter: 2000,
                interactive: false,
                action: null,
            }))
            return
        }
        if(userInfo.id !== room.playerTurn) {
            dispatch(showAlert({
                message: 'Please wait for your turn!',
                dismissAfter: 2000,
                interactive: false,
                action: null,
            }))
            return
        }

        const isTileEmpty = gameState[rowIndex][colIndex] === 0
        const isGameFinished = room.isGameFinished
        if(isTileEmpty && !isGameFinished) {
            dispatch(executeGame(rowIndex, colIndex))
        }
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
