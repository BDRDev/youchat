
import { USER_SEARCH } from '../actions/types';

const initialState = { 
  search: null
};


export default function(state = initialState, action) {

	switch(action.type){

		case USER_SEARCH: 

			console.log('user search reducer', action.payload);
			return { search: action.payload }

		default:
			return state;
	}

} 