import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchConversation } from '../actions/conversation';

import ConversationDisplay from './ConversationDisplay';

class Dashboard extends Component {

	componentDidMount = () => {
		console.log('dashboard mounts', this.props)
		this.getConversations();
	}

	getConversations = () => {
		const { auth } = this.props;

		if(auth && auth.conversations.length > 0){

			//fetch the conversations
			auth.conversations.forEach( async ({ conversationId }) => {
				//fetch conversation based off of Id
				console.log(conversationId);

				this.props.fetchConversation(conversationId);
			})
		}
	}


	displayContent = () => {
		console.log('displayContent', this.props.conversation);
		console.log('this.props.auth.conversations.length', this.props.auth.conversations)

		const { conversation } = this.props;

		//checks to see if a user is logged in
		if(this.props.auth){

			//checks to see if we have any conversations
			if(this.props.auth.conversations.length > 0  && conversation.length > 0){

				//console.log('at least one convo in state');
				//loop through the array and return a messageDisplay Component

				return conversation.map((conversation, index) => {
					console.log('loop', conversation);

					return <ConversationDisplay 
								key={index} 
								conversation={conversation}
								userCode={this.props.auth.youChatCode}
							/>;
				})



			} else {
				
				return <div>No Conversations</div>
			}
		}
	}

	render(){
		console.log('Dashboard Render', this.props);
		return(
			<div>
				{this.displayContent()}
			</div>
		)
	}
}

const mapStateToProps = ({ auth, conversation }) => {
	return { auth, conversation };
}

export default connect(mapStateToProps, {
	fetchConversation
})(Dashboard);