const mongoose = require('mongoose');

const User = mongoose.model('users');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });


module.exports = app => {

	app.get(
		'/api/search/user',
		urlencodedParser,
		//send them to a different route after login
		 async (req, res) => {

			const term = req.query.term;

			console.log(term);

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