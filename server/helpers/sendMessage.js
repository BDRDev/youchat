const mongoose = require('mongoose');
const Conversation = mongoose.model('conversations');


module.exports = async data => {

	//console.log('data', data.messageObj);

	const { _id, code, fName, lName, message } = data.messageObj;

	let conversation = await Conversation.findOneAndUpdate(
		{ _id: _id },
		{ 
			$push: { messages: { code: code, fName: fName, lName: lName, message: message } },
			lastUpdated: Date.now()
	 	},
		{ new: true }
	);

	return conversation

}