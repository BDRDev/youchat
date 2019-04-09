const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
	code: String,
	fName: String,
	lName: String,
	time: { type: Date, default: Date.now },
	message: String
});

module.exports = messageSchema;