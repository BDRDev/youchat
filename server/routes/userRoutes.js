const mongoose = require('mongoose');

const User = mongoose.model('users');


module.exports = app => {

	app.get(
		'/api/search/user',
		//send them to a different route after login
		 async (req, res) => {

			const term = req.query.term;

			const user = await User.find({
				youChatCode: term
			})

			
			if(user[0]){
				const userReturn = {
					fName: user[0].fName,
					lName: user[0].lName,
					youChatCode: user[0].youChatCode
				}

				console.log(userReturn)
				
				res.send(userReturn);
			} else {
				res.send(user);
			}
		}
	);
}