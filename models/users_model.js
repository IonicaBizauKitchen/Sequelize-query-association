var EventUser = require('./event_user_model.js');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
//_______________________________________________Declare table structure ______________________________________________

var User = sequelize.define('user', {
  //id: {
  //  type: Sequelize.STRING,
  //  primaryKey: true,
  //  },
  username: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,

  },
   birthday: {
    type: Sequelize.DATE
  },
   job: {
    type: Sequelize.STRING
  },
   position: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  adminrole: {
  //  type: Sequelize.BOOLEAN,
     type: Sequelize.STRING //'admin', 'member'
//    defaultValue: false //usually, new users are not admins
  },
   paidCurrentFee: {
    type: Sequelize.BOOLEAN
  },
  LastFeePayDate:{
    type: Sequelize.DATE
  },
  activeAccount:{
    //type:Sequelize.BOOLEAN
    type: Sequelize.STRING
  },
}, {
  freezeTableName: true
});

//___________________________________Establish relationships with other tables____________________

// 1.  N Users - N Events (N-N)

//____________________________________________________________________________________________

User.sync({force:true}).then(function () { //sync only creates table; cannot update them  //detele  force: true when in production
  return User.create({
    //id:'ORD0',
    username: 'username',
    lastname: 'Lastname',
    password: 'parola',
    birthday: new Date(1995, 9, 13),
    job: 'myjob ',
    position: 'myposition',
    email: 'coltaemanuela@gmail.com',
    phone: '0770111222',
    adminrole:'admin',
    paidCurrentFee: true,
    LastFeePayDate: new Date(2017, 2,14),
    activeAccount: 'active',//true,

  });
}).then(c => {
    console.log("User Created", c.toJSON());
})
.catch(e => console.error(e));

//_______________________________________________________________________________________________________________________

module.exports = User;
