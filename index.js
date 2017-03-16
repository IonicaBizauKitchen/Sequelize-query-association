//===============Modules=============================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var multer= require('multer');
var fs = require('fs');
var util = require('util');
var session = require('express-session');
var authentication= require('sequelize-authentication');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportlocal= require('passport-local');
var passportsession= require('passport-session');

var User = require('./models/users_model.js');



passport.use(new LocalStrategy({
    passReqToCallback: true
}, function(req, username, password, done) {
    User.findOne({ username: username }).then(function(user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password !== user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      req.session.user = user.toJSON();
      //if (!user.validPassword(password)) {
      //  return done(null, false, { message: 'Incorrect password.' });
      //}
      done(null, req.session.user);
    }).catch(err => {
      console.error(err);
      done(err);
    });
  }
));

var users= require('./controllers/users.js');
var router = express.Router();

var app = express();

app.use(session({
    secret:"ceva",
    resave:true, //false
    saveUninitialized:true,
    cookie:{},
    duration: 45 * 60 * 1000,
    activeDuration: 15 * 60 * 1000
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ id: id }).then(function(user) {
    done(null, user);
    console.log(id);
  }).catch(e => done(e));
});
// Passport init
app.use(passport.initialize());
app.use(passport.session());



var events= require('./controllers/events.js');
var users= require('./controllers/users.js');
var members= require('./controllers/members.js');

//-------------------------------- View engine setup------------------------------------------------------------------------------
app.use("/resources",express.static(__dirname + "/resources"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', users);
app.use('/events', events);
app.use('/members', members);


//------------------------------------------------Routes---------------------------------------------------------------------------
app.get('/', function (req, res) {
     res.send('Welcome to MILLESIME!');
});

app.get('/admin', function (req, res) {
     res.send('Admin area');
});
app.get('/statistics', function (req, res) {
     //res.send('STATISTICS');
     res.render('statistics');
});

app.get('/events', function (req, res) {
     res.render('events');
});

app.get('/regulations', function (req, res) {
     res.render('regulations');
});


app.get('/history', function (req, res) {
     res.send('The history of the club');
});

//-------------------------------------Server---------------------------------------------------------------------------------

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
