const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = require('./Message');
const UserSchema = require('./ConversationUser');

//conversation model
const conversationSchema = new Schema({
	users: [UserSchema],
	messages: [MessageSchema],
	lastUpdated: { type: Date, default: Date.now() }
	
});

//tells mongoose the new collection needs to be created
//first argument is the name of the collection, second is the schema
module.exports = mongoose.model('conversations', conversationSchema)