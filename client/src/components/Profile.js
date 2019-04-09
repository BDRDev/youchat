import React from 'react';

//material ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 8
  },
  fullName: {
  	marginBottom: 4
  }
});

const Profile = props => {

	console.log('profile', props);

	const { classes, auth } = props;

	return(
		<div>
	      <Paper className={classes.root} elevation={4}>
	        <Typography className={classes.fullName} variant="h5" component="h3">
	          Hi {auth.fName} {auth.lName}
	        </Typography>
	        <Typography component="p">
	          your YouChatCode is {auth.youChatCode}
	        </Typography>
	      </Paper>
	    </div>
	)
}

const mapStateToProps = ({ auth }) => {

	return { auth }
}

export default connect(mapStateToProps, {})(withStyles(styles)(Profile));