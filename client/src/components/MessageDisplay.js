import React, { Component } from 'react';

import Message from './Message';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    width: '100%',
    flex: 1,
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '8px 0',
    boxSizing: 'border-box',
    overflow: 'hidden'
  },
  textField: {
    width: '100%'
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  content: {
    overflow: 'auto',
    height: 'auto',
    padding: '0 8px',
    webkitOverflowScrolling: 'touch',
    msOverflowStyle: 'none'
  }
});

class MessageDisplay extends Component {

  componentDidMount = () => {
    const messages = document.getElementById('messageWrapper');
    messages.scrollTop = messages.scrollHeight;
  }

  componentDidUpdate = () => {
    const messages = document.getElementById('messageWrapper');
    messages.scrollTop = messages.scrollHeight;
  }

  displayMessages = (messages, user) => {
    return messages.map((message, index) => {

        if(message.code === user){
          return <Message key={index} side='right' message={message.message} />

        } else if(message.code !== user){
          return <Message key={index} side='left' message={message.message} />
        }
    });
  }
	
  render(){
    const { classes, messages, user } = this.props;
  	return(
  		<div className={classes.container}>
          <div id='messageWrapper' className={classes.content}>
    			  {this.displayMessages(messages, user)}
          </div>
  		</div>
  	)
  }

}

export default withStyles(styles)(MessageDisplay);