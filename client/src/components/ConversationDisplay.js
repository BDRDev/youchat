import React from 'react';

import { Link } from 'react-router-dom';

//for material ui 
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    marginTop: 10
  },
  MuiCardContent: {
  	paddingBottom: 10
  },
  content: {
  	padding: 10,
  	paddingBottom: '10px !important'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 4,
  },
  link: {
    textDecoration: 'none'
  }
};

const ConversationDisplay = props => {
	const { classes } = props;
  const { messages } = props.conversation;

  const names = apartOfConversation(props.conversation.users, props.userCode);

  console.log('Conversation Display Render', props)

	return (
    <Link 
      to={`/conversation/${props.conversation._id}`} 
      className={classes.link}
    >
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h5" component="h2">
            {displayNames(names)}
           </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {displayLastMessage(messages)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

//returns the users whose yc Code does not match the users who is logged in
const apartOfConversation = (users, currentUser) => {
  return users.map(user => user.youChatCode === currentUser ? null : user ).filter((el => {
    return el != null;
  })
)}

const displayNames = names => {
  return names.map(({ fName, lName }, index) => {
    return(
      <div key={index}>
        {fName} {lName}
      </div>
    )
  })
}

const displayLastMessage = messages => {
  if(messages.length > 0){
    return <React.Fragment>{messages[messages.length - 1].message}</React.Fragment>;

  } else {
    return <React.Fragment>No Messages</React.Fragment>;
  }
}

export default withStyles(styles)(ConversationDisplay);