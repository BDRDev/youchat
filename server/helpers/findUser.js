//this is going to find users based off of their yc Code

const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = async code => {

	const user = await User.find({
		youChatCode: code
	});

	return user[0];

}