var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportlocal= require('passport-local');
var passportsession= require('passport-session');
var router = express.Router();
var User = require('../models/users_model.js');
//var Sequelize = require('sequelize');
//var sequelize = require('../models/sequelize');

//_____________________________________________________________________ READ_____________________________________________


router.get('/',function(req,res){
res.send('USERS');
});

router.get('/register', function(req, res) {
	 res.render('registration', {title: "Inregistrare" });
});

router.post('/register', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var username= req.body.username;
    var lastname= req.body.lastname;
    var job= req.body.job;
    var position = req.body.position;
    var birthday= req.body.birthday;
    var adminrole= req.body.adminrole;
    var phone= req.body.phone;
    
    console.log(adminrole);
  
    console.log(email, password, username, lastname, job, position, phone, birthday);
  
   User.findAll().then(user => {
    usersNumber = user.length;
    x=usersNumber+1;
    var y =usersNumber.toString();
    var uid='ORD'+ y;
    console.log('Numarul de useri existenti inainte de inserare:', user.length ,uid );

	User.sync().then(function (){
	  return User.create({
	    id:uid,
	    email: email,
      password:password,
      username: username,
      lastname: lastname,
      adminrole: adminrole,
      activeAccount: 'active',//true, //default values
      LastFeePayDate:  Date.now(),//default values
      paidCurrentFee: true, //default values
      job: job,
      position: position,
      birthday: birthday,
      phone: phone,
		 });
	}).then(c => {
	    console.log("User Created", c.toJSON());
	     res.redirect('/users');
	}).catch(e => console.error(e));	
 });    
});

router.get('/login',function(req,res){
	res.render('authentication');
});

//router.post('/login', function(req, res, next) {
//    console.log(req.url);  // '/login'
//    console.log(req.body); // { username: 'username', password: 'parola' } 
//    passport.authenticate('local', function(err, user, info) {
//        console.log("authenticate");
//        console.log('error:',err);
//        console.log('user:',user);
//        console.log('info:',info);
//    })(req, res, next);
//});

router.post('/login', passport.authenticate('local', { 
	successRedirect: '/statistics',                    
	failureRedirect: '/users/register' 
	}));


router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/users/login');
 // res.send('logout');
});



//_______________________________________________________________________________________________________________________

module.exports = router;
