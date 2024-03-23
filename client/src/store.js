import { combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import urlReducer from './reducers/url';
import { configureStore } from '@reduxjs/toolkit';

export default () => {
	const reducer = combineReducers({ url: urlReducer });
	return configureStore({
		reducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
	});
}