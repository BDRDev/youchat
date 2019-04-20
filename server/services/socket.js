

//dynamically figures out what port we need to be listening to
//process.env.PORT is an environment variable from node, if not listen to 5000
//const PORT = process.env.PORT || 5000

//io.listen(4999, () => { console.log('+++YouChat Express Server with Socket.io Running') });


const connections = [];

io.on('connection', function(socket){
	console.log('connected to socket - ', socket.id);
	connections.push(socket);

	socket.on('disconnect', () => {
		console.log('Disconnected - ', socket.id);
	})

	socket.on('test', () => {

		console.log('this is a test function to see if this is actually working');

		io.emit('testReceived');
	})

	socket.on('sendMessage', conversationId => {
		console.log('a message was sent, dispatch to users');

		io.emit('getMessages', conversationId);
	})
})