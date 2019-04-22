import io from 'socket.io-client';

//for ajax calls
import axios from 'axios';

import { START_SOCKET } from './types';

const setSocketId = userId => async dispatch => {
	console.log('setSocketId');

	await axios.post('/api/socket/setId', { params: { userId } });
}

export const startSocket = userId => async dispatch => {

	await dispatch(setSocketId(userId));

	let socket;

	if(process.env.NODE_ENV !== 'production'){
		socket = io.connect('http://localhost:5000');
	} else {
		socket = io();
	}

	if(socket){
		console.dir(socket);

		dispatch({
			type: START_SOCKET,
			payload: true
		})
	}
}

export const socketTest = socket =>  async dispatch => {
	console.log('socket test', socket);

	socket.emit('test');
}

export const sendMessageSocket = (socket, conversationId) => async dispatch => {
	console.log('message sent with socket');

	socket.emit('sendMessage', conversationId);
}