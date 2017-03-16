var express = require('express');
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});
var fs = require("fs");
var router = express.Router();
var Event = require('../models/events_model.js');
var EventUser= require('../models/event_user_model.js');
//var Sequelize = require('sequelize');
//var sequelize = require('../models/sequelize');

//________________________________________________________________________READ ____________________________________________

router.get('/', function(req, res){   
	    Event.findAll().then(event => {
	    eventsNumber = event.length;            
	    console.log('Number of events found:', event.length );   
       const resObj = event.map(event => {  
        return Object.assign(
          {
            id: event.id,
            title: event.title,
            description: event.description,
            availabletickets: event.availabletickets,
            date: event.date.toString().substring(4,21),
          }
        );
      });
   //   res.json(resObj);  //ok    
       res.render('events', {number: eventsNumber, data: resObj });
      });	       
});

//_____________________________________________________________________ Create_____________________________________________


router.get('/add',function(req,res){
 	return res.render('createEvent', { title: ' Adauga Eveniment' });
});

router.post('/add', /*upload.single('image'),*/ function(req, res) {
   var title = req.body.title;
    var description = req.body.description;
    var availabletickets= req.body.availabletickets;
    var date = req.body.date;
  //  var image = req.file;
 console.log(req.body);

 Event.findAll().then(event => {
    eventsNumber = event.length;   
    console.log('Numarul de evenimente existente inainte de inserare:', event.length );

	Event.sync().then(function (){
	  return Event.create({
	   // eventid:eventsNumber+1,
	  title: title,
      date: date,
      description: description,
      availabletickets: availabletickets,
		 });
	}).then(c => {
	    console.log("Created event", c.toJSON());
	     res.redirect('/events');
	}).catch(e => console.error(e));	
 });
});

//______________________________________________________________Query_______________________________________________________
router.get('/see', function(req, res){

EventUser.findAll({
    where: {
        eventId: 62
    },
    include: [Event]
}).then(function(results) {
    console.log(results);
    return results.map(function(eventuser) {
        return eventuser.Event;  
    });
}).then(function(results) {
    return results.map(function(eventuser) {
        return eventuser.toJSON(); 
    });
}).then(events => {	    
    // This will be an array
	res.json(events);
});

//.then(attendances => {	    
//    // This will be an array
//	res.json(attendances);
//});

});

//________________________________________________________________Edit________________________________________________________

router.get('/edit/:id', function(req, res) {
    
    var id= req.params.id;
    Event.findById(req.params.id).then(function(event) {
        id= event.id;
       // eventid=id+1; //there is an issue in view. The value of the id of the item I want to edit is interpreted as previous
      //  console.log(id, eventid);
        title= event.title;
        description= event.description;     
        availabletickets=event.availabletickets; 
        date= event.date;        
        newDate= date.toString();
        newdate= newDate.substring(0,21);
        
        console.log(title, description, availabletickets, date, newDate,newdate);
         console.log(id);
        }) .then(function() {
            res.render('eventEdit', {
                id: id, 
                pagetitle: ' Modifica Eveniment',
                title: title,
                description:description,
                availabletickets:availabletickets,
                newdate: newdate,              
            });
        })
        .catch(function(error) {
            res.render('error', {
                error: error
            });
        });       
});

router.post('/edit', function(req, res){
 //  var eventid = req.params.eventid;
   var id = req.body.id;
   var title = req.body.title;    
   var description = req.body.description;
   var availabletickets= req.body.availabletickets;
   var date = req.body.date;
  // var image = req.file;
  console.log('Id-ul evenimentului editat:', id);
  console.log('titleeeeeeeeeeeee:', title, description, availabletickets, date);
   //if(!req.date){
   //    date= Date.now();
   //}
   // if (!req.file) {
   //     console.log('no image has been uploaded');
   // }
  const newData = {  
     title: title,
	   date: date,
	   description: description,
	   availabletickets: availabletickets
  };
   
	Event.update(
    newData,
      {    
      where:{
        id:id
        }
       }
  ).then(function() {
		 console.log("Event updated");
	    res.redirect('/events');
	}).catch(e => console.error(e));

});

//_______________________________________________Delete__________________________________________________________________

router.get('/delete/:id', function(req,res){
    var id = req.params.id;
   
Event.destroy({
  where: {
    id: id
  }
}).then(function() {
    console.log('deleted');
    res.redirect('/events');
    }).catch(e => console.error(e));
 });
//_______________________________________________________________________________________________________________________

module.exports = router;