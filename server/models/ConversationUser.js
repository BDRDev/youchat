const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationUserSchema = new Schema({
	youChatCode: String,
	update: { type: Boolean, default: false },
	fName: String,
	lName: String
});

module.exports = conversationUserSchema;