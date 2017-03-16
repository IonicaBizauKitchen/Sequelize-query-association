var User = require('./users_model.js');
var Event= require('./events_model.js');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
//_______________________________________________Declare table structure ______________________________________________
var EventUser = sequelize.define('eventuser', {    
 reservationConfirmation:{
    type:Sequelize.BOOLEAN,
 },
 attendance:{
    type:Sequelize.BOOLEAN
 },
},
{
  freezeTableName: true 
});

//___________________________________Establish relationships with other tables_______________________________________
EventUser.belongsTo(Event);
EventUser.belongsTo(User);
//________________________________________Create table_______________________________________________________________

EventUser.sync().then(function () {
  return EventUser.create({
  //  user_id: 'ORD0',
    reservationConfirmation: true,
    attendance: true,    
  });
}).then(c => {
    console.log("Created", c.toJSON());
}).catch(e => console.error(e));

//_______________________________________________________________________________________________________________________

module.exports = EventUser;