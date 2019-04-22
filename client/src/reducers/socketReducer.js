
import { START_SOCKET } from '../actions/types';

const defaultState = {
	socketRunning: false
}

export default function(state = defaultState, action) {

	switch(action.type){

		case START_SOCKET: 

			console.log('start socket reducer', action.payload);
			return { socketRunning: true }

		default:
			return state;
	}

} 