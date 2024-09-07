import {React} from 'react'
import TileComponent from './TileComponent'
import { useDispatch, useSelector } from 'react-redux'
import { updateTile } from '../Actions/Actions'

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
  const dispatch = useDispatch()

  const handleClick = (rowIndex, colIndex) => {
    dispatch(updateTile(2,rowIndex,colIndex))
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