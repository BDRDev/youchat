const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
	sentBy: String,
	time: { type: Date, default: Date.now },
	message: String
});

module.exports = messageSchema;