//this is going to take the yc codes and create a new conversation



const mongoose = require('mongoose');

const Conversation = mongoose.model('conversations');

module.exports = async codes => {

	console.log('create conversation', codes);

	const conversation = await new Conversation({
		users: codes
	}).save();

	return conversation;

}