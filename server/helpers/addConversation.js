const mongoose = require('mongoose');
const User = mongoose.model('users');


module.exports = async (usersCode, allCodes, conversationId) => {

	console.log('add conversation', usersCode)

	//the first object is what we are looking for, second object is what we are updating
	User.updateOne(
	{ youChatCode: usersCode },
	{ $push: { conversations: { users: allCodes, conversationId: conversationId } } }
	).exec();

	//we need to add not set

}