import { useDispatch } from 'react-redux'
import { updateTile, changePlayer, runGameLogic } from '../Actions/Actions'

export const useRunGame = () => {
    const dispatch = useDispatch()

    const runGame = (row, col) => {
        dispatch(updateTile(row, col))
        dispatch(runGameLogic(row, col))
        dispatch(changePlayer())
    }

    return runGame
}
