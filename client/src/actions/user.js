

//for ajax calls
import axios from 'axios';

import { fetchConversation } from './conversation';
import { fetchUser } from './auth';

import { USER_SEARCH, CREATE_CONVERSATION } from './types';

export const userSearch = term => async dispatch => {

	const res = await axios.get('/api/search/user', { params: { term } });

	dispatch({
		type: USER_SEARCH,
		payload: res.data
	})
}

export const createConversation = (users, callback) => async dispatch => {

	const res = await axios.post('/api/conversation/new', { users });

	console.log('createConversation', res);

	if(res.data.created){
		await dispatch(fetchUser())
		await dispatch(fetchConversation(res.data.conversationId));

		callback(res.data.conversationId);
	}

	dispatch({
		type: CREATE_CONVERSATION,
		payload: res.data
	});
}