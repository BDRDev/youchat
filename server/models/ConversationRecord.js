const mongoose = require('mongoose');
const { Schema } = mongoose;



const conversationRecordSchema = new Schema({
	users: [String],
	conversationId: String,
	created: { type: Date, default: Date.now },
	show: { type: Boolean, default: true }
});

module.exports = conversationRecordSchema;