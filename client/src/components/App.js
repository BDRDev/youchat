import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Profile from './Profile';

//action creators
import { fetchUser } from '../actions/auth';

class App extends React.Component {

	componentDidMount = () => {
		console.log('app component mounted');

		this.props.fetchUser();
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

		return(
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route path="/" component={Landing} exact />

						{this.displayDashboard()}
						{this.displayProfile()}
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


export default connect(mapStateToProps, { fetchUser })(App);