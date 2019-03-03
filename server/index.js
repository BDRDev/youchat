//root start up file for NodeJS

//import express application
const express = require('express');

//create express application
const app = express();

//create a route hander
//arrow function gets called right when a request is made to the route
app.get('/', (req, res) => {
	res.send({ hi: 'there' });
})

//dynamically figures out what port we need to be listening to
//process.env.PORT is an environment variable from node, if not listen to 5000
const PORT = process.env.PORT || 5000
app.listen(PORT);