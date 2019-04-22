

import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import conversationReducer from './conversationReducer';
import socketReducer from './socketReducer';

export default combineReducers({
	auth: authReducer,
	user: userReducer,
	conversation: conversationReducer,
	socket: socketReducer
})