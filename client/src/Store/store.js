import { configureStore } from '@reduxjs/toolkit'
import initialState from './initialState'
import Reducer from '../Reducers/Reducer'
const store = configureStore({
    reducer: Reducer,
    preloadedState: initialState, // Correctly set initial state
})
if (process.env.NODE_ENV === 'development') {
    window.store = store
}
export default store
