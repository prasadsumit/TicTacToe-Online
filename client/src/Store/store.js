import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import gameStateReducer from '../Reducers/gameStateReducer'
import playerReducer from '../Reducers/playerReducer'
import gameStatusReducer from '../Reducers/gameStatusReducer'
import initialState from './initialState'
import { thunk } from 'redux-thunk'
import winnerModalReducer from '../Reducers/winnerModalReducer'
import inputModalReducer from '../Reducers/inputModalReducer'
import userInfoReducer from '../Reducers/userInfoReducer'
import Reducer from '../Reducers/Reducer'

// Combining multiple reducers
const rootReducer = combineReducers({
    gameState: gameStateReducer,
    player: playerReducer,
    isGameFinished: gameStatusReducer,
    showWinnerModal: winnerModalReducer,
    inputModal: inputModalReducer,
    userInfo: userInfoReducer,
})

const store = configureStore({
    reducer: Reducer,
    preloadedState: initialState, // Correctly set initial state
})

export default store
