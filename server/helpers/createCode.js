

module.exports = (firstName, lastName) => {

	

	let youChatCode = "";

	const res = lastName.split('');

	youChatCode += firstName
	youChatCode += res[0];
	youChatCode += '#';

	console.log('date', Date.now());

	let current = Date.now().toString();
	current = current.split('');

	let numbers = "";

	for(let x = 0; x < 4; x++){

		numbers += current[(current.length - x) - 1];
	}

	youChatCode += numbers;

	console.log('yc Code', youChatCode);

	return youChatCode;

}