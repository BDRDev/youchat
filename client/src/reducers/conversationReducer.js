
import { FETCH_CONVERSATION } from '../actions/types';

export default function(state = [], action) {

	switch(action.type){

		case FETCH_CONVERSATION: 

			return [ ...state, action.payload ]

		default:
			return state;
	}

} 