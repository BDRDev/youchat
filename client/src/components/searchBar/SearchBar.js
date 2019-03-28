import React, { Component } from 'react';

import { connect } from 'react-redux';

import { userSearch, createConversation } from '../../actions/user';

import SearchResult from './SearchResult';

//material ui
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';

//removed from FromControl - className={classes.margin}

const styles = theme => ({
  margin: {
    margin: '5px',
    width: '290px',
    boxSizing: 'borderBox'
  },
});

class SearchBar extends Component {

	state = { search: '' }

	onSubmit = e => {
		console.log(this.state.search);

		this.props.userSearch(this.state.search);
		e.preventDefault();
	}

	onChange = (e) => {

		this.setState({
			search: e.target.value
		})
	}

	createConversation = searchCode => {
		// console.log('searched code', searchCode);
		// console.log('our code', this.props.auth.youChatCode)

		const ourCode = this.props.auth.youChatCode;

		const codes = [ourCode, searchCode]

		this.props.createConversation(codes);
	}

	displayResults = () => {
		console.log(this.props)
		console.log('displayResults', this.props.user.search)

		const currentYouChatCode = this.props.auth.youChatCode;
		const user = this.props.user.search;


		//check to be sure that we get a result back and that we are not searching for our self
		//kind of want to add another to check if user search is null or empty
		//null means we havnt searched yet, empty meaning there are no results for the search
		//just to mix up the messages we give to the user when they look at the search bar
		if(this.props.user.search && (currentYouChatCode !== user.youChatCode)){
			return <SearchResult 
						first={user.fName} 
						last={user.lName} 
						code={user.youChatCode}
						createConversation={this.createConversation}
					/>
		} else if (this.props.user.search && (currentYouChatCode === user.youChatCode)){

			return <div>You cant search for your self</div>;
		} else {
			return null;
		}
		
	}


	render(){
		const { classes } = this.props;
		return(
			<div className='searchBar'>
				<form onSubmit={this.onSubmit}>
					<FormControl className={classes.margin} >

					<InputLabel htmlFor="input-with-icon-adornment">Search for a user</InputLabel>
						<Input
							id="input-with-icon-adornment"
							onChange={this.onChange}
							value={this.state.search}
							startAdornment={
								<InputAdornment position="start">
								<AccountCircle />
								</InputAdornment>
							}
						/>
					</FormControl>
				</form>

				{this.displayResults()}
			</div>
		)
	}
}

const mapStateToProps = state => {

	console.log('mapStateToProps from SearchBar', state);

	return state;
}

export default connect(mapStateToProps, {
	userSearch,
	createConversation
})(withStyles(styles)(SearchBar));