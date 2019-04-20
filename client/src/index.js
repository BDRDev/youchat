//React
import React from 'react';
import ReactDOM from 'react-dom';

//Redux
import { Provider } from 'react-redux'; //component that allows other components to access application state
import { createStore, applyMiddleware } from 'redux';
//middleware
import reduxThunk from 'redux-thunk';

//Reducer
import reducers from './reducers';



//my Components
import App from './components/App';

import axios from 'axios';
//this is used for making http requests in the console
window.axios = axios;



//pass our reducers to the store
// const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//this is how we setup a dummy reducer, for when we do not have any reducers yet
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//sets App as a child of the Provider Component. This is what allows all components to access the store
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.querySelector('#root')
);

