import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import gameStateReducer from '../Reducers/gameStateReducer';
import playerReducer from '../Reducers/playerReducer';
import gameStatusReducer from '../Reducers/gameStatusReducer';
import initialState from './initialState';
import { thunk } from 'redux-thunk';
import winnerModalReducer from '../Reducers/winnerModalReducer';

// Combining multiple reducers
const rootReducer = combineReducers({
  gameState: gameStateReducer,
  player: playerReducer,
  isGameFinished: gameStatusReducer,
  showWinnerModal: winnerModalReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),  // Add thunk as middleware
  preloadedState: initialState,  // Correctly set initial state
});

export default store;
