import React from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';

import MessageTextInput from './MessageTextInput';
import MessageDisplay from './MessageDisplay';

import { fetchConversation, sendMessage } from '../actions/conversation';
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

		if(!this.props.current){
			this.props.fetchConversation(this.props.match.params.id);
		}
	}

	
	messageSubmit = async message => {
		const { auth, current, sendMessage, sendMessageSocket, match } = this.props;

		const messageObj = {
			message,
			_id: current._id,
			fName: auth.fName,
			lName: auth.lName,
			code: auth.youChatCode
		}

		await sendMessage(messageObj);

		current.users.map(user => {
			if(user.youChatCode !== auth.youChatCode){
				sendMessageSocket(this.props.runningSocket, match.params.id, user.youChatCode);
			}
		})
	}

	render(){
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

	return { current, auth, socket };

}

export default connect(mapStateToProps, {
	sendMessage,
	fetchConversation,
	sendMessageSocket
})(withStyles(styles)(Conversation));