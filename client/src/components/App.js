import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Profile from './Profile';
import Conversation from './Conversation';

//action creators
import { fetchUser } from '../actions/auth';
import { fetchConversation } from '../actions/conversation';
import { startSocket } from '../actions/socket';

//for socket.io
// import io from 'socket.io-client';

const styles = theme => ({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  componentsContainer: {
  	height: '100%',
  	display: 'flex',
  	flexDirection: 'column'
  }
});

let socket;

class App extends React.Component {

	constructor(props){
		super(props);

		console.log('props', this.props);

		console.log('this.props.socket', this.props.socket);

		this.props.fetchUser();


	}

	componentDidUpdate = () => {
		const { auth } = this.props;

		if(auth && !this.props.socket.socketRunning){
			this.props.startSocket(auth.youChatCode)
		}
	}

	//this is inplace so that the dashboard and profile only mount if
	//a user is logged in and we have their data is the application state
	displayDashboard = () => {
		const { auth } = this.props;
		if(auth)
			return <Route path="/dashboard" render={props => <Dashboard {...props} />} exact/>;
	}

	displayProfile = () => {
		const { auth } = this.props;
		if(auth)
			return <Route path="/profile" component={Profile} exact />;
	}

	render(){
		const { classes } = this.props;

		console.log('render App');

		if(this.props.socket.socket){
			const { socket } = this.props.socket.socket;

			this.props.socket.socket.on('getMessages', res => {
				console.log('getMessages', res);
				
				this.props.fetchConversation(res);
			})
		}

		return(
			<div className={classes.appContainer}>
				<BrowserRouter>
					<div className={classes.componentsContainer}>
						<Header socket={socket} />
						<Route path="/" component={Landing} exact />
						{this.displayDashboard()}
						{this.displayProfile()}
						<Route 
							path="/conversation/:id" 
							render={props => <Conversation {...props} socket={socket}/>} 
							exact 
						/>
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state;
}


export default connect(mapStateToProps, { 
	fetchUser, 
	fetchConversation,
	startSocket
})(withStyles(styles)(App));