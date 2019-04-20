

//for ajax calls
import axios from 'axios';

import { FETCH_CONVERSATION, SEND_MESSAGE } from './types';

export const fetchConversation = conversationId => async dispatch => {

	console.log('fetchConversation');

	const res = await axios.get('/api/conversation/fetch', { params: { conversationId } });

	console.log('res.data', res.data);

	dispatch({
		type: FETCH_CONVERSATION,
		payload: res.data
	})
}
export const sendMessage = messageObj => async dispatch => {

	//console.log('send message', messageObj);

	const res = await axios.post('/api/conversation/sendMessage', { messageObj });

	console.log('send message response', res)

	dispatch({
		type: FETCH_CONVERSATION,
		payload: res.data
	})
}