const Server = require('socket.io');
const io = new Server();

io.listen(4999, () => { console.log('+++YouChat Express Server with Socket.io Running') })

io.on('connection', function(socket){
	console.log('connected to socket - ', socket.id)

	socket.on('test', () => {

		console.log('this is a test function to see if this is actually working');
	})
})