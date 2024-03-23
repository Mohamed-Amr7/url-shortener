import {GENERATE_URL, SET_ERROR, SET_LOADING} from '../actions/generateUrl';
import {FETCH_ALL_URLS} from "../actions/fetchUrls";

const defaultState = {
	allUrls:undefined,
	lastUrl: undefined,
	isLoading: false,
	error: false,
}

export default (state = defaultState, action) => {
	switch(action.type){
		case GENERATE_URL:
			return {
				allUrls:undefined,
				lastUrl: action.payload,
				isLoading: false,
				error: false,
			};
		case FETCH_ALL_URLS:
			return {
				allUrls: action.payload,
				lastUrl: undefined,
				isLoading: false,
				error: false,
			};
		case SET_LOADING:
			return {
				...state, 
				isLoading: action.payload,
			};
		case SET_ERROR:
			return {
				...state,
				error: true,
				isLoading: false
			}
		default:
			return state;
	}
}