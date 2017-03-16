var express = require('express');
var router = express.Router();
var User = require('../models/users_model.js');
//var Sequelize = require('sequelize');
//var sequelize = require('../models/sequelize');
//_____________________________________________________________________ READ_____________________________________________

router.get('/',function(req,res){

User.findAll().then(user => {
	    usersNumber = user.length;            
	    console.log( user.length );   
       const resObj = user.map(user => {
        LastFeePayDate= user.LastFeePayDate;
        activeAccount= user.activeAccount;
        if(user.activeAccount===true)
            activeAccount="Membru activ";
            else
            activeAccount="Membru inactiv";
         if(user.adminrole==='admin')
            adminrole="Administrator";
            else
            adminrole="Membru club";
            
        if(LastFeePayDate)
        //LastFeePayDate
       
            return Object.assign(
          {
            id: user.id,
            username: user.username,
            lastname: user.lastname,
            email: user.email,
            job: user.job,
            position: user.position,
            phone: user.phone,
            birthday: user.birthday.toString().substring(4,15),
            lastName: user.lastname,
            adminrole: user.adminrole,
            LastFeePayDate:user.LastFeePayDate.toString().substring(4,15),
            activeAccount:activeAccount,
          }
        );
         else{
               return Object.assign(
          {
            id: user.id,
            username: user.username,
            lastname: user.lastname,
            email: user.email,
            job: user.job,
            position: user.position,
            phone: user.phone,
            birthday: user.birthday.toString().substring(4,15),
            lastName: user.lastname,
            adminrole: user.adminrole,
            LastFeePayDate:'Cotizatie neachitata',
            activeAccount: activeAccount,
          }
        );
        }
        
    
      });
     //res.json(resObj);  //ok    
      res.render('members', {number: usersNumber, data: resObj });
      });	       
});

//________________________________________________________________Edit________________________________________________________

router.get('/edit/:id', function(req, res) {
    var id=req.params.id;
    //var id= uid+1;
    User.findById(id).then(function(user) {
            id= user.id;
           //id=uid+1;
            //uid=id+1; 
            username= user.username;
            lastname= user.lastname;
            email= user.email;
            job= user.job;
            position= user.position;
            phone= user.phone;
            birthday=user.birthday.toString().substring(4,15);
            lastname= user.lastname;
            adminrole= user.adminrole;
            LastFeePayDate=user.LastFeePayDate.toString().substring(4,15);
            activeAccount= user.activeAccount;
            
            if(user.activeAccount === 'active')
            activeAccount= 'Membru activ';
            else
            activeAccount='Membru inactiv';
             if(adminrole==='admin')
             adminrole= 'Administrator';
             else
             adminrole='Membru Club';
            
        }) .then(function() {
            res.render('memberEdit', {
                id: id, 
                pagetitle: ' Modifica Detalii Membru',
                username: username,
                lastname: lastname,
                email: email,
                job: job,
                position: position,
                phone: phone,
                birthday: birthday.toString().substring(4,15), //get rid of this
                lastName: lastname,                
                adminrole: adminrole,
                LastFeePayDate:LastFeePayDate.toString().substring(0,15),
                activeAccount: activeAccount,
            });
        })
        .catch(function(error) {
            res.render('error', {
                error: error
            });
        });       
});

router.post('/edit', function(req, res){

    var id = req.body.id;
    var email = req.body.email;
  //  var password = req.body.password;
    var username= req.body.username;
    var lastname= req.body.lastname;
    var job= req.body.job;
    var position = req.body.position;
  //  var birthday= req.body.birthday;
    var adminrole= req.body.adminrole;
     var activeAccount= req.body.activeAccount;
    var phone= req.body.phone;
  console.log('Id-ul membrului editat:', id);


  const newData = {  
    id: id,              
    username: username,
    lastname: lastname,
    email: email,
    job: job,
    position: position,
    phone: phone,
   // birthday: birthday.toString().substring(4,15), //get rid of this
    lastName: lastname,
    adminrole: adminrole,
    activeAccount: activeAccount,
  };
   
	User.update(
    newData,
      {    
      where:{
        id:id
        }
       }
  ).then(function() {
		 console.log("Member info updated");
	    res.redirect('/members');
	}).catch(e => console.error(e));

});


//_______________________________________________________________________________________________________________________

module.exports = router;