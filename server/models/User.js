const mongoose = require('mongoose');
const { Schema } = mongoose;

const shortid = require('shortid');

const ConversationRecordSchema = require('./ConversationRecord');



//user model
const userSchema = new Schema({
	googleId: String,
	youChatCode: { type: String, default: shortid.generate },
	fName: String,
	lName: String,
	email: String,
	conversations: [ConversationRecordSchema]
	
});

//tells mongoose the new collection needs to be created
//first argument is the name of the collection, second is the schema
module.exports = mongoose.model('users', userSchema)

