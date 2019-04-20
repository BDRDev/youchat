import React from 'react';


import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

import Add from '@material-ui/icons/Add';

const styles = {
  card: {
    minWidth: 275,
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    margin: '5px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  add: {
  	margin: 0
  },
  nameWrapper: {
  	padding: '0 8px'
  },
  name: {
  	padding: '16px 8px'
  },
  pos: {
    marginBottom: 12,
  },
	fab: {
		margin: '8px'
	},
};

const SearchResult = props => {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.name}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.first} {props.last}
        </Typography>
      </CardContent>
      <CardActions className={classes.nameWrapper}>
        <Fab color="primary" onClick={()=>props.createConversation(props.code)} aria-label="Add" size='small' className={classes.fab}>
        	<Add />
      	</Fab>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(SearchResult);