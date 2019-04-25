import io from 'socket.io-client';

//for ajax calls
import axios from 'axios';

import { START_SOCKET } from './types';

export const setSocketId = userId => async dispatch => {
	console.log('setSocketId');

	await axios.post('/api/socket/setId', { params: { userId } });
}

export const startSocket = userId => async dispatch => {

	console.log('START SOCKET')

	await dispatch(setSocketId(userId));

	let socket;

	if(process.env.NODE_ENV !== 'production'){
		socket = io.connect('http://localhost:5000');
	} else {
		socket = io();
	}

	if(socket){
		console.dir(socket);

		let data = {
			socketRunning: true,
			socket: socket
		}

		dispatch({
			type: START_SOCKET,
			payload: data
		})
	}
}

export const sendMessageSocket = (socket, conversationId, userId) => async dispatch => {
	//console.log('message sent with socket');

	socket.emit('sendMessage', conversationId, userId);

	console.log(socket);
}

export const createConversationSocket = (socket, userId) => async dispatch => {
	console.log('create Conversation Emitted to SOCKET')

	socket.emit('createConversation', userId)
}