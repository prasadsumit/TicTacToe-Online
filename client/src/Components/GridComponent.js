import {React} from 'react'
import TileComponent from './TileComponent'
import { useSelector } from 'react-redux'
import { useRunGame } from '../Middleware/RunGame'

function GridComponent() {
  const gridStyle = {
    display: "grid",
    "grid-template-columns": "4fr 4fr 4fr",
    width: "40%"
  }

  const symbolMap = {
    0: '',
    1: 'x',
    2: '0',
  }
  
  const gameState = useSelector((state) => state.gameState)
  const runGame = useRunGame()

  const handleClick = (rowIndex, colIndex) => {
    let isTileEmpty = gameState[rowIndex][colIndex] === 0
    if(isTileEmpty) {
      runGame(rowIndex, colIndex);
    }
  };
  return (
    <div style={gridStyle}>
      {
        gameState.map((el, rowIndex) => {
            return el.map((val, colIndex) => {
              return <TileComponent
                value={symbolMap[val]}
                onClick={() => handleClick(rowIndex,colIndex)}
              />
            })
        })
      }
    </div>
  )
}

export default GridComponent