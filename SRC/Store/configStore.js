import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import HomeReducer from '../Reducers/HomeReducer';
import ProfileReducer from '../Reducers/ProfileReducer';
const rootReducer = combineReducers({HomeReducer, ProfileReducer});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
