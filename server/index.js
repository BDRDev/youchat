//root start up file for NodeJS

//import express application
const express = require('express');

//passport used for oauth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//create express application
const app = express();


passport.use(new GoogleStrategy());




//dynamically figures out what port we need to be listening to
//process.env.PORT is an environment variable from node, if not listen to 5000
const PORT = process.env.PORT || 5000
app.listen(PORT);