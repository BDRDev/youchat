

//for ajax calls
import axios from 'axios';

import { USER_SEARCH, CREATE_CONVERSATION } from './types';

export const userSearch = term => async dispatch => {

	console.log('user search action', term);

	const res = await axios.get(`/api/search/user?term=${term}`);

	console.log('res data', res.data);

	dispatch({
		type: USER_SEARCH,
		payload: res.data
	})
}

export const createConversation = codes => async dispatch => {

	console.log('codes', codes);

	const res = await axios.post('/api/conversation/new', { codes });

	console.log('res', res);

	dispatch({
		type: CREATE_CONVERSATION,
		payload: 'fake'
	})
}