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

//for socket.io
import io from 'socket.io-client';

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

class App extends React.Component {

	constructor(props){
		console.log('App constructor');
		super(props);

		console.log('props', this.props);

		this.props.fetchUser();

		let socket = io.connect('http://localhost:4999');
		console.dir(socket);
	}

	componentDidMount = () => {
		console.log('app component mounted');

		//this.props.fetchUser();
	}

	//this is inplace so that the dashboard and profile only mount if
	//a user is logged in and we have their data is the application state
	displayDashboard = () => {
		const { auth } = this.props;
		if(auth)
			return <Route path="/dashboard" component={Dashboard} exact />;
	}

	displayProfile = () => {
		const { auth } = this.props;
		if(auth)
			return <Route path="/profile" component={Profile} exact />;
	}

	render(){
		const { classes } = this.props;

		return(
			<div className={classes.appContainer}>
				<BrowserRouter>
					<div className={classes.componentsContainer}>
						<Header />
						<Route path="/" component={Landing} exact />
						{this.displayDashboard()}
						{this.displayProfile()}
						<Route path="/conversation/:id" component={Conversation} exact />
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

const mapStateToProps = state => {

	console.log('state', state);
	return state;
}


export default connect(mapStateToProps, { fetchUser })(withStyles(styles)(App));