import { useDispatch, useSelector } from 'react-redux'  
import { updateTile, changePlayer, runGameLogic } from '../Actions/Actions'

export const useRunGame = () => {
  
  const dispatch = useDispatch()
  const player = useSelector(state => state.player)
  
  const runGame = (row, col) => {
    dispatch(updateTile(row,col,player))
    dispatch(runGameLogic(row,col))  
    dispatch(changePlayer(-1))
    // dispatch(executeGame(row,col,player))
  };

  return runGame
}