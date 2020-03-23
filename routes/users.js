const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../services/mail');

const fieldsReturn = 'firstName lastName email role';

const users = (router) => {
  // Get all Users
  router.get('/users', function (req, res, next) {

    User.find(null, fieldsReturn, function (err, users) {
      if (err)
        console.log(err);

      res.json(users);
    });

  });

  // Get one User (By ID)
  router.get('/users/:id', function (req, res, next) {

    const id = req.params.id;

    User.findById(id, fieldsReturn, function (err, user) {
      if (err)
        console.log(err);

      res.json(user);
    });

  });

  // Update User
  router.put('/users/:id', function (req, res, next) {

    const saltRounds = 10;
    const id = req.params.id;

    User.findById(id, fieldsReturn, function (err, user) {
      if (err)
        console.log(err);

      if (user) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          if (err)
            console.log(err);

          bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err)
              console.log(err);

            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.password = hash;
            if (req.body.role)
              user.role = req.body.role;

            user.save(function (err, userUpdated) {
              if (err)
                console.log(err);

              res.json("User updated");
            });
          });
        });
      }
      else {
        res.status(404).json("No user found");
      }
    });

  });

  // Create User
  router.post('/users', function (req, res, next) {

    const user = new User();

    user.email = req.body.email;
    user.role = req.body.role || "user";

    user.token = jwt.sign({email: user.email}, process.env.JWT_KEY);

    user.save(function (err, userUp) {
      if (err)
        console.log(err);

      sendMail(user);
      res.json("User created");
    });
  });

  // Delete User
  router.delete('/users/:id', function (req, res, next) {

    const id = { _id: req.params.id };

    User.deleteOne(id, function (err, response) {
      if (err)
        console.log(err);

      res.json(response);
    });
  });

};

module.exports = users;
