import React from 'react';

import { withStyles } from '@material-ui/core/styles';
//import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  textField: {
    flexGrow: 2,
    marginTop: '8px !important'
  },
  button: {
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8,
    width: 90
  }
});

class MessageTextInput extends React.Component {
  state = {
    value: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = e => {
  	this.props.messageSubmit(this.state.value);

    this.setState({
      value: ''
    });
    
  	e.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return(
    	 <form className={classes.container} onSubmit={this.onSubmit} noValidate autoComplete="off">
				<TextField
          id="outlined-multiline-flexible"
          label="Message"
          multiline
          rowsMax="8"
          value={this.state.value}
          onChange={this.handleChange('value')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />

        <Button variant="contained" color="primary" className={classes.button} onClick={this.onSubmit}>
	        Send
	      </Button>
    	</form>
  	)
	}

}

export default withStyles(styles)(MessageTextInput);