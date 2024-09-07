import { createStore } from 'redux';
import tileReducer from '../Reducers/Reducer';
import initialState from './initialState';


const store = createStore(tileReducer,initialState);

export default store;