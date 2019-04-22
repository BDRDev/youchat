import React from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';

import { sendMessage } from '../actions/conversation';

import { withStyles } from '@material-ui/core/styles';

import MessageTextInput from './MessageTextInput';
import MessageDisplay from './MessageDisplay';

import { fetchConversation } from '../actions/conversation';
import { sendMessageSocket } from '../actions/socket';

const styles = theme => ({
  conversationContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
});

class Conversation extends React.Component {

	constructor(props){
		super(props);

		console.log(this.props)

		if(this.props.current){
			console.log('have convo')
		} else {
			console.log('do not have convo');
			//need an action creator to fetch a single conversation
			this.props.fetchConversation(this.props.match.params.id);
		}	
	}

	componentDidMount = () => {
		console.log('conversation componentDidMount props', this.props);
	}

	messageSubmit = async message => {
		const { auth, current, sendMessage, sendMessageSocket, socket, match } = this.props;

		const messageObj = {
			message,
			_id: current._id,
			fName: auth.fName,
			lName: auth.lName,
			code: auth.youChatCode
		}

		await sendMessage(messageObj);
		sendMessageSocket(socket.socket, match.params.id);

	}

	render(){
		console.log('conversation props', this.props);
		const { classes } = this.props;
		if(this.props.current){
			return(
				<div className={classes.conversationContainer}>
					<MessageDisplay messages={this.props.current.messages} user={this.props.auth.youChatCode}/>
					<MessageTextInput messageSubmit={this.messageSubmit} />
				</div>
			)
		} else {
			return <div>Conversation</div>
		}
	}
}

const mapStateToProps = ({ auth, conversation, socket }, ownProps) => {
	const current = _.find(conversation, { _id: ownProps.match.params.id });

	console.log('convo mapStateToProps', socket);

	return { current, auth, socket };

}

export default connect(mapStateToProps, {
	sendMessage,
	fetchConversation,
	sendMessageSocket
})(withStyles(styles)(Conversation));