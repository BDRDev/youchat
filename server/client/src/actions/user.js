

//for ajax calls
import axios from 'axios';

import { USER_SEARCH, CREATE_CONVERSATION } from './types';

export const userSearch = term => async dispatch => {

	const res = await axios.get('/api/search/user', { params: { term } });

	dispatch({
		type: USER_SEARCH,
		payload: res.data
	})
}

export const createConversation = users => async dispatch => {

	const res = await axios.post('/api/conversation/new', { users });

	dispatch({
		type: CREATE_CONVERSATION,
		payload: res.data
	});
}