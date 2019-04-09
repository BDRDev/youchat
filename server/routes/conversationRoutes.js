
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: true });

const findUser = require('../helpers/findUser');
const createConversation = require('../helpers/createConversation');
const addConversation = require('../helpers/addConversation');
const sendMessage = require('../helpers/sendMessage');

const fetchConversation = require('../helpers/fetchConversation');



const _ = require('lodash');

module.exports = app => {

	app.post('/api/conversation/new', urlencodedParser, async (req, res) => {
		//this is an array of yc codes that we are trying to create a conversation with
		const ycCodes = req.body.users;


		//gets users profile based off of their you chat codes, idk if we need this here. Will leave it for now
		let users = await Promise.all(ycCodes.map(async code => await findUser(code)));

		console.log('users', users);

		//active user is the one who is initiating all of this
		const activeUser = users[0];

		//we always need to be sure that our youChatCode is the first.
		//do we need all the other users or just us?

		//at this point I have all the users that we want to add to a conversation
		//For now I am only going to check my conversations, in theory if we are checking to see if we
		//are in a conversation with this user already, it would reflect in both arrays. So I only need to check one

		//first thing we are going to do is check if the array is empty

		let data = users.map(({ fName, lName, youChatCode }) => {
			return { fName, lName, youChatCode }
		})

		console.log('data', data);
		
		
		if(activeUser.conversations.length === 0){
			//if there are no conversations we want to go ahead and make the conversation
			const conversation = await createConversation(data);

			await Promise.all(ycCodes.map(async code => 
				await addConversation(code, ycCodes, conversation.id)
			));

			//I might want to send the conversation it's self
			//
			res.send('both conversations were created');

		} else {
			//now we have to check to see if one of the conversations user's matched the array of codes we get

			//by default match is false;
			let match = false;

			//loops through each of the current user's conversations
			//compares the user's array to the codes that was passed
			//if there is a match, we do not create a conversation
			//if there is not a match, we create a conversation
			_.forEach(activeUser.conversations, (conversation, key) => {
				console.log('convo', conversation);

				if(_.isEqual(conversation.users, ycCodes)){
					match = true;
					return false;
				}
			})


			if(match){
				res.send('conversation already exists')
			} else {

				//if there is no match we create the conversation, then add it to the users
				const conversation = await createConversation(data);
					
				await Promise.all(ycCodes.map(async code => 
					await addConversation(code, ycCodes, conversation.id)
				));

				res.send('both conversations were created');

			}
		}

	});

	app.get('/api/conversation/fetch', urlencodedParser, async (req, res) => {

		const id = req.query.conversationId;

		const result = await fetchConversation(id);


		res.send(result);
	})

	app.post('/api/conversation/sendMessage', urlencodedParser, async (req, res) => {

		console.log(req.body);

		const conversation = await sendMessage(req.body);

		res.send(conversation);
	})

}