import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import SearchBar from './searchBar/SearchBar';

//for material-ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBackRounded';
import Person from '@material-ui/icons/Person';
import Message from '@material-ui/icons/Message';


const styles = {
  root: {
    //flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
  link: {
  	textDecoration: 'none'
  }
};

class Header extends Component {

	constructor(props){
		super(props)

		this.state = {
	    	right: false,
		};
	}

	toggleDrawer = (side, open) => () => {
		this.setState({
	  		[side]: open,
		});
	};

	displayHeaderContent = () => {
		if(this.props.auth){
			const classes = { menuButton: '' }
			return(
				<IconButton 
	      	className={classes.menuButton} 
	      	onClick={this.toggleDrawer('right', true)} 
	      	color="inherit" 
	      	aria-label="Menu"
				>
	        <MenuIcon />
	      </IconButton>
			)
		} else {
			return(
				<Button href="/auth/google" color="inherit">Login</Button>
			)
		}
	}

	displayTopMenu = () => {
		return(
			<SearchBar />
		)
	}

	displayBottomMenu = () => {
		const { classes } = this.props;
		return(
			<div>
				<Link 
					to='/profile' 
					className={classes.link} 
					onClick={this.toggleDrawer('right', false)}
				>
					<ListItem button key='0'>
				        <ListItemIcon><Person /></ListItemIcon>
				        <ListItemText primary='Profile' />
			      </ListItem>
	      		</Link>

				<Link 
					to='/dashboard' 
					className={classes.link} 
					onClick={this.toggleDrawer('right', false)}
				>
					<ListItem button key='0'>
						<ListItemIcon><Message /></ListItemIcon>
						<ListItemText primary='Messages' />
					</ListItem>
				</Link>

				<a 
					href='/auth/logout' 
					className={classes.link} 
					onClick={this.toggleDrawer('right', false)}
				>
					<ListItem button key='2'>
						<ListItemIcon><ArrowBack /></ListItemIcon>
						<ListItemText primary='Log Out' />
					</ListItem>
				</a>
			</div>
		)
	}

	render(){
		const { classes } = this.props;
		
		const sideList = (
	      <div className={classes.list}>
	        <List>
	          {this.displayTopMenu()}
	        </List>
	        <Divider />
	        <List>
	          {this.displayBottomMenu()}
	        </List>
	      </div>
	    );

		return(

			<div className={classes.root}>
		      <AppBar position="static">
		        <Toolbar>
		          
		          <Typography variant="h6" color="inherit" className={classes.grow}>
		          </Typography>
		          {this.displayHeaderContent()}
		        </Toolbar>
		      </AppBar>

		      <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
	          <div
	            tabIndex={0}
	            role="button"
	          >
	            {sideList}
	          </div>
	        </Drawer>
		    </div>
		)
	}

}

const mapStateToProps = state => {
	return state;
}


export default connect(mapStateToProps, )(withStyles(styles)(Header));