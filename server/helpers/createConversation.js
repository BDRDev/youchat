//this is going to take the yc codes and create a new conversation



const mongoose = require('mongoose');

const Conversation = mongoose.model('conversations');

module.exports = codes => {

	console.log('create conversation', codes);

	const conversation = new Conversation({
		users: codes.map(({ youChatCode, fName, lName }) => (
				{ youChatCode, fName, lName }
			)
		)
	}).save();

	return conversation;

}