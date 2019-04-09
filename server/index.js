//root start up file for NodeJS -> initial application setup

//import express application
const express = require('express');
//import mongoose
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const socketServer = require('socket.io');
//imports the userSchema
require('./models/User');
//requires the conversationSchema
require('./models/Conversation');



//requires all of the keys for the page
const keys = require('./config/keys');

const cookieSession = require('cookie-session');
const passport = require('passport');


//imports out passport configuration from the passport.js file
require('./services/passport');





//create express application
const app = express();
var http = require('http').Server(app);

app.use(bodyParser.json());


//lets mongoose connect to our database
mongoose.connect(keys.mongoURI);

var db = mongoose.connection;
db.on('error', () => { console.log('---YouChat FAILED to connect to mongoose') });
db.once('open', () => { console.log('+++YouChat connected to mongoose') });

// require('./services/socket');

//tell express to make use of cookies
app.use(
	cookieSession({
		//how long the cookie exists before it expires -> ms
		maxAge: 30 * 24 * 60 * 60 * 1000,
		//key to incrypt cookie -> can use multiple in an array
		keys: [keys.cookieKey]
	})
);

//makes sure that passport knows about the cookies
app.use(passport.initialize());
app.use(passport.session());

//all routes
//this is a function, and it is expecting that we call it and pass the app to it
//requires authRoutes file, returns a function, then we immediately call the function with the app object
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/conversationRoutes')(app);




//dynamically figures out what port we need to be listening to
//process.env.PORT is an environment variable from node, if not listen to 5000
const PORT = process.env.PORT || 5000
app.listen(PORT);