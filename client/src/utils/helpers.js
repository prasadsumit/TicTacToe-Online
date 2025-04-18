const getOpponentId = (playerId, getState) => {
    return Object.keys(getState().room.players).filter((key) => key !== playerId)[0]
}
const evaluateIndex = (row, col, gameState) => {
    if (!gameState || !Array.isArray(gameState) || !Array.isArray(gameState[0])) {
        throw new Error('Invalid gameState structure')
    }

    if (
        row < 0 ||
        row >= gameState.length ||
        col < 0 ||
        col >= gameState[row].length
    ) {
        throw new Error(`Invalid row or col: row=${row}, col=${col}`)
    }

    let value = gameState[row][col]

    // left-diagonal
    if (row === col) {
        console.log('left diagonal')
        let compareArr = [
            gameState[0][0],
            gameState[1][1],
            gameState[2][2],
        ]
        compareArr = compareArr.map((el) => {
            return el === value
        })
        if(compareArr.indexOf(false) === -1) {
            return true
        }
    }
    // right-diagonal
    if(row + col === 2) {
        console.log('right diagonal')
        let compareArr = [
            gameState[0][2],
            gameState[1][1],
            gameState[2][0],
        ]
        compareArr = compareArr.map((el) => {
            return el === value
        })
        if(compareArr.indexOf(false) === -1) {
            return true
        }
    }

    // row-traverse
    console.log('row traverse')
    let isRowMatch = true
    for(let i = 0; i < 3; i++) {
        if(gameState[row][i] !== value) {
            isRowMatch = false
            break
        }
    }

    if(isRowMatch) {
        return true
    }
    // col-traverse
    console.log('col traverse')
    let isColMatch = true
    for(let j = 0; j < 3; j++) {
        if(gameState[j][col] !== value) {
            isColMatch = false
            break
        }
    }

    if(isColMatch) {
        return true
    }

    return false
}

const isAllNonZeros = (matrix) => {
    return matrix.every(row => row.every(cell => cell !== 0))
}

export { getOpponentId, evaluateIndex, isAllNonZeros }
