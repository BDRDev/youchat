
import { FETCH_CONVERSATION } from '../actions/types';

import _ from 'lodash';

export default function(state = [], action) {

	switch(action.type){


		case FETCH_CONVERSATION: 

			console.log('fetch conversation reducer');

			//checks to see if a conversation with the same id is already there
			//if it is we update the conversation instead of add it to the array
			if(_.find(state, { _id: action.payload._id })){

				//checks again to make sure that the conversation we fetched is still in the array
				//if it is we return the new one to take its place
				return state.map(convo => convo._id === action.payload._id ? action.payload : convo);
					

				//return state;
			}

			return [ ...state, action.payload ]

		default:
			return state;
	}

} 