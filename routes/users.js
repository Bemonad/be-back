const User = require('../models/user');
const bcrypt = require('bcrypt');

const users = (router) => {
// Get all Users
  router.get('/users', function (req, res, next) {

    User.find(function (err, games) {
      if (err)
        res.send(err);

      res.json(games);
    });

  });

// Get one User
  router.get('/users/:id', function (req, res, next) {

    const id = req.params.id;

    User.findOne({ id: id }, function (err, user) {
      if (err)
        res.send(err);

      res.json(user);
    });

  });

// Create User
  router.post('/users', function (req, res, next) {

    const saltRounds = 10;
    const user = new User();
    
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = req.body.password;
    user.email = req.body.email;
    user.role = req.body.role || "user";

    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err)
        console.log(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err)
          console.log(err);

        user.password = hash;

        user.save(function (err) {
          if (err)
            res.send(err);

          res.json("User created");
        });
      });
    });

  });
};

module.exports = users;
