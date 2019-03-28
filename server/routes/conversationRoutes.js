
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: true });

const findUser = require('../helpers/findUser');
const createConversation = require('../helpers/createConversation');
const addConversation = require('../helpers/addConversation');



const _ = require('lodash');

module.exports = app => {

	app.post('/api/conversation/new', urlencodedParser, async (req, res) => {

		
		//this is an array of yc codes that we are trying to create a conversation with
		const ycCodes = req.body.codes;



		//gets users profile based off of their you chat codes, idk if we need this here. Will leave it for now
		let users = await Promise.all(ycCodes.map(async code => await findUser(code)));


		//active user is the one who is initiating all of this
		const activeUser = users[0];

		//console.log('users', users);

		//we always need to be sure that our youChatCode is the first.
		//do we need all the other users or just us?

		//at this point I have all the users that we want to add to a conversation
		//For now I am only going to check my conversations, in theory if we are checking to see if we
		//are in a conversation with this user already, it would reflect in both arrays. So I only need to check one

		//first thing we are going to do is check if the array is empty
		
		
		if(activeUser.conversations.length === 0){
			//if there are no conversations we want to go ahead and make the conversation
			console.log('no conversations');

			const conversation = await createConversation(ycCodes);

			console.log('new conversation', conversation);
			console.log('conversation Id', conversation.id);


			console.log('yc Code', activeUser.youChatCode);

			await Promise.all(ycCodes.map(async code => 
				await addConversation(code, ycCodes, conversation.id)
			));

			res.send('both conversations were created');

			

		} else {

			console.log('there is a convo');

			//now we have to check to see if one of the conversations user's matched the array of codes we get
			console.log(activeUser.conversations[0].users);

			//by default match is false;
			let match = false;

			//loops through each of the current user's conversations
			//compares the user's array to the codes that was passed
			//if there is a match, we do not create a conversation
			//if there is not a match, we create a conversation
			_.forEach(activeUser.conversations, (conversation, key) => {
				console.log('convo', conversation.users);

				if(_.isEqual(conversation.users, ycCodes)){
					match = true;
					return false;
				}
			})

			console.log('match', match);

			if(match){
				res.send('conversation already exists')
			} else {

				//if there is no match we create the conversation, then add it to the users
				const conversation = await createConversation(ycCodes);

				console.log('new conversation', conversation);
				console.log('conversation Id', conversation.id);
					
				await Promise.all(ycCodes.map(async code => 
					await addConversation(code, ycCodes, conversation.id)
				));

				res.send('both conversations were created');

			}

			
		}

		//then we create the conversation

		



		
	});

}