import {React,useState} from 'react'
import TileComponent from './TileComponent'

function GridComponent() {
  const gridStyle = {
    display: "grid",
    "grid-template-columns": "4fr 4fr 4fr",
    width: "40%"
  }

  const [gameState,setGameState] = useState([
    [0, 1, 2],
    [0, 0, 1],
    [0, 2, 1],
  ])

  const symbolMap = {
    0: '',
    1: 'x',
    2: '0',
  }
  
  const handleClick = (rowIndex, colIndex) => {
    // console.log(`Row: ${rowIndex}, Column: ${colIndex}`);
    const newGameState = [...gameState]
    newGameState[rowIndex][colIndex] = 2
    setGameState(newGameState)
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