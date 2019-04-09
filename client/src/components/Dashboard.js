import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchConversation } from '../actions/conversation';

import ConversationDisplay from './ConversationDisplay';

class Dashboard extends Component {

	//I kind of just want to do this once then let the tick function update the state
	//this is fine for now but once I get messaging I want to add a check to see
	//if we have any conversations, if we do do noto run this
	//This will work for now but once we have a lot of conversations with a lot of
	//messages it can get to be a lot of data we are fetching each time
	componentDidMount = () => {
		//console.log('dashboard mounts', this.props)
		this.getConversations();

		// this.timerID = setInterval(
		// 	() => this.tick(),5000
		// );
	}

	//this is looking for the current users update on all of the conversations
	//tomorrow I will set up updateCheck()
	tick = () => {
		console.log('tick');
	}

	getConversations = () => {
		const { auth } = this.props;

		if(auth && auth.conversations.length > 0){
			//console.log('fetch em');

			//fetch the conversations
			auth.conversations.forEach( async ({ conversationId }) => {
				//fetch conversation based off of Id
				console.log(conversationId);

				this.props.fetchConversation(conversationId);
			})
		}
	}


	displayContent = () => {
		//console.log('displayContent', this.props.conversation)

		const { conversation } = this.props;

		//checks to see if a user is logged in
		if(this.props.auth){

			//checks to see if we have any conversations
			if(this.props.auth.conversations.length > 0  && conversation.length > 0){

				//console.log('at least one convo in state');
				//loop through the array and return a messageDisplay Component

				return conversation.map((conversation, index) => {
					//console.log('loop', conversation);

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