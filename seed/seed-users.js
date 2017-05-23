var mongoose = require('mongoose');
var User = require('../models/user');
mongoose.connect('mongodb://localhost:27017/shopping')
var users = [
  new User({
    email: 'julian@bigla.cl',
    firstname: 'Julian',
    lastname: 'Beggs',
    country: 'Regional',
    role: 'administrador',
    password: 'julian@bigla.cl'
  }),
  new User({
    email: 'felipe@bigla.cl',
    firstname: 'Felipe',
    lastname: 'Avaria',
    country: 'Regional',
    role: 'administrador',
    password: 'felipe@bigla.cl'
  }),
  new User({
    email: 'oscar.a.betancourt@kcc.com',
    firstname: 'Oscar',
    lastname: 'Betancourt',
    country: 'Regional',
    role: 'administrador',
    password: 'oscar.a.betancourt@kcc.com'
  }),
  new User({
    email: 'sylvia.m.schuler@kcc.com',
    firstname: 'Sylvia',
    lastname: 'Schuler',
    country: 'Regional',
    role: 'administrador',
    password: 'sylvia.m.schuler@kcc.com'
  }),
  new User({
    email: 'diego.f.miranda@kcc.com',
    firstname: 'Diego',
    lastname: 'Miranda',
    country: 'Regional',
    role: 'administrador',
    password: 'diego.f.miranda@kcc.com'
  }),
  new User({
    email: 'douglas.g.franco@kcc.com',
    firstname: 'Douglas',
    lastname: 'Franco',
    country: 'Regional',
    role: 'aprobador',
    password: 'douglas.g.franco@kcc.com'
  }),
  new User({
    email: 'gerhard.rost@kcc.com',
    firstname: 'Gerhard',
    lastname: 'Rost',
    country: 'C&C',
    role: 'usuario',
    password: 'gerhard.rost@kcc.com'
  }),
  new User({
    email: 'vanessarocio.r.rodriguez@kcc.com',
    firstname: 'Vanessa Rocío',
    lastname: 'Rodriguez',
    country: 'Andino',
    role: 'usuario',
    password: 'vanessarocio.r.rodriguez@kcc.com'
  }),
  new User({
    email: 'florencia.luis@kcc.com',
    firstname: 'Florencia',
    lastname: 'Luis',
    country: 'Argentina',
    role: 'usuario',
    password: 'florencia.luis@kcc.com'
  }),
  new User({
    email: 'simone.d.simoes@kcc.com',
    firstname: 'Simone',
    lastname: 'Simoes',
    country: 'Brasil',
    role: 'usuario',
    password: 'simone.d.simoes@kcc.com'
  }),
  new User({
    email: 'jonathan.lamac@kcc.com',
    firstname: 'Jonathan',
    lastname: 'Lamac',
    country: 'Chile',
    role: 'usuario',
    password: 'jonathan.lamac@kcc.com'
  }),
];
// populate array to mongodb
var done = 0;
var skip = false
for (var i = 0; i < users.length; i++) {
  console.log(users.length, i, users[i].email);
  // check if user is already in mongodb
  // if (checkUserExists(users[i].email)) {
  //   skip = true
  // } else {
  //   skip = false
  // }
  // add to mongodb if necessary
  console.log('skip: ' + skip);
  if (skip === false) {
    createNewUser(users[i])
  }
  // end of loop
  console.log('done: ' + done);
  done++
  if (done === users.length) {
    exit()
  }
}

function checkUserExists(email) {
  console.log('checking user exists: ' + email);
  return User.findOne({
    'email': email
  }, 'email', function(err, result) {
    if (err) {
      return console.error(err);
    }
    console.log('result: '+result);
    if (result !== null) {
      console.log('User exists: ' + result.email);
      return true
    } else {
      console.log('no user found: ' + result);
      return false
    }
  })
}

function createNewUser(new_user) {
  // create new user
  console.log('create new user: ' + new_user.email);
  var newUser = new User()
  newUser.email = new_user.email.toLowerCase();
  newUser.firstname = new_user.firstname;
  newUser.lastname = new_user.lastname;
  newUser.country = new_user.country;
  newUser.role = new_user.role;
  newUser.password = newUser.encryptPassword(newUser.email);
  newUser.save(function(err, result) {
    if (err) {
      return console.log(err);
    }
    console.log(newUser.email + ' added to mongodb');
  })
}

function exit() {
  mongoose.disconnect();
}
