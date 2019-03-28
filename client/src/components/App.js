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

	render(){

		return(
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route path="/" component={Landing} exact />
						<Route path="/dashboard" component={Dashboard} exact />
						<Route path="/profile" component={Profile} exact />
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