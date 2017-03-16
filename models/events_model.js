//var EventUser = require('./event_user_model.js');
var User = require('./users_model.js');

var Sequelize = require('sequelize');
var sequelize = require('./sequelize');

//_______________________________________________Declare table structure ______________________________________________

var Event = sequelize.define('event', {    
  date: {
    type: Sequelize.DATE
  },
  title: {
    type: Sequelize.STRING,
   // unique:true,
   // allowNull: false
  },   
   description: {
    type: Sequelize.STRING
  },
  availabletickets: {
    type: Sequelize.INTEGER
  },
  
}, {
  freezeTableName: true 
});

//___________________________________Establish relationships with other tables____________________

//   N Users - N Events (N-N)


//Event.belongsTo(EventUser);


//Event.belongsToMany(User, { through: EventUser });
//________________________________________Create table_______________________________________________________________

Event.sync().then(function () {
  return Event.create({
    title: 'Event1',
    date: new Date(24, 9, 2016),
    description: 'Description of the event',
    availabletickets: 45,    
  });
}).then(c => {
    console.log("Created event", c.toJSON());
}).catch(e => console.error(e));


//_______________________________________________________________________________________________________________________

module.exports = Event;