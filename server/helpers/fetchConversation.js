//this is going to find users based off of their yc Code

const mongoose = require('mongoose');

const Conversation = mongoose.model('conversations');

module.exports = async id => {

	const conversation = await Conversation.find({
		_id: id
	});

	return conversation[0];

}