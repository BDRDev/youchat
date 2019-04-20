


module.exports = io => {

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
}