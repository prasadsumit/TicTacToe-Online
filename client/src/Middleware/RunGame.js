import { useDispatch, useSelector } from 'react-redux'  
import { updateTile, changePlayer, runGameLogic } from '../Actions/Actions'

export const useRunGame = () => {
  
  const dispatch = useDispatch()
  const player = useSelector(state => state.player)
  const isGameFinished = useSelector(state => state.isGameFinished)
  
  
  const runGame = (rowIndex, colIndex) => {
    
    dispatch(updateTile(rowIndex,colIndex,player))
    dispatch(runGameLogic(rowIndex,colIndex))  
    
    if(isGameFinished){
      alert(`Player ${player} wins!`);
    }else{
      dispatch(changePlayer(-1))
    }
  };

  return runGame
}