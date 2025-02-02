import '../Css/Board.css'
import { useState } from 'react'

export default function BoardComponent(props) {
    const [ board, setBoard ] = useState(Array(9).fill(null))
    const [ isXNext, setIsXNext ] = useState(true) // State to track the current player

    // Handler for when a square is clicked
    const handleClick = (index) => {
        if (board[index]) {
            return
        } // Prevent changing a square that's already clicked

        const newBoard = [ ...board ]
        newBoard[index] = isXNext ? 'X' : 'O' // Set 'X' or 'O' based on the current player
        setBoard(newBoard)
        setIsXNext(!isXNext) // Switch turns
    }

    const getIcon = (value) => {
        let icon = null
        if (value === 'X') {
            icon = <span className="material-symbols-outlined fade-in"> close </span>
        } else if (value === 'O') {
            icon = <span className="material-symbols-outlined fade-in"> radio_button_unchecked </span>
        }
        return icon
    }
    return (
        <div className="game-board">
            {board.map((value, index) => {
                return <div
                    key={index}
                    className={`square ${getSquareClasses(index)}`}
                    onClick={() => {
                        return handleClick(index)
                    }}
                >
                    {getIcon(value)}
                </div>
            }
            )}
        </div>
    )
}

// Utility function to apply CSS classes based on square position
function getSquareClasses(index) {
    const classes = []
    if (index < 3) {
        classes.push('top')
    }
    if (index > 5) {
        classes.push('bottom')
    }
    if (index % 3 === 0) {
        classes.push('left')
    }
    if (index % 3 === 2) {
        classes.push('right')
    }
    return classes.join(' ')
}
