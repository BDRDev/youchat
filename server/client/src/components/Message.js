import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	messageContainer: {
		display: 'flex',
		marginTop: 8
	},
	message: {
		display: 'inline',
		padding: 8,
		boxSizing: 'border-box',
		borderRadius: 5,
		maxWidth: '75%'
	},
	right: {
		justifyContent: 'flex-end'
	},
	left: {
		justifyContent: 'flex-start'
	},
	blue: {
		backgroundColor: '#add8e6'
	},
	grey: {
		backgroundColor: '#d3d3d3'
	}
});


const Message = (props) => {
	const { classes, side } = props;

	return(
		<div className={side === 'right' ? `${classes.messageContainer} ${classes.right}` 
																		 : `${classes.messageContainer} ${classes.left}`}>
			<div className={side === 'right' ? `${classes.message} ${classes.blue}`
																			 : `${classes.message} ${classes.grey}` }>
				{props.message}
			</div>
		</div>
	)
}

export default withStyles(styles)(Message);