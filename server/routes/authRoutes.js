
const passport = require('passport');

//exports the routes so we can import them into the index.js files
module.exports = app => {

	//when users go to /auth/google we kick them into the oauth flow
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}));

	//when users get redirected back from google with their code
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		//send them to a different route after login
		(req, res) => {
			// res.redirect('/dashboard');
			res.redirect('/');
		}
	);

	app.get('/auth/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	})

	app.get('/api/current_user', (req, res) => {

		//req.user is the user model that made the request
		res.send(req.user)
	})

}