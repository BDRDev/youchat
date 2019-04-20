

import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import conversationReducer from './conversationReducer';

export default combineReducers({
	auth: authReducer,
	user: userReducer,
	conversation: conversationReducer
})