

export const socketTest = socket =>  async dispatch => {
	console.log('socket test', socket);

	socket.emit('test');
}

export const sendMessageSocket = (socket, conversationId) => async dispatch => {
	console.log('message sent with socket');

	socket.emit('sendMessage', conversationId);
}