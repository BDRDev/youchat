

//for ajax calls
import axios from 'axios';

import { FETCH_CONVERSATION } from './types';

export const fetchConversation = conversationId => async dispatch => {

	console.log('fetchConversation');

	const res = await axios.get('api/conversation/fetch', { params: { conversationId } });

	console.log('res.data', res.data);

	dispatch({
		type: FETCH_CONVERSATION,
		payload: res.data
	})
}