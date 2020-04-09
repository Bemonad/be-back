const User = require('../models/user');
const sendMail = require('../services/mail');
const jwt = require('jsonwebtoken');

const fieldsReturn = 'firstName lastName email role token';

const users = (router) => {
  // Get all Users
  router.get('/users', function (req, res, next) {

    User.find(null, fieldsReturn, function (err, users) {
      if (err)
        console.log(err);

      res.json(users);
    });

  });

  // Get one User (By JWT)
  router.get('/users/:token', async (req, res, next) => {

    try {
      // const user = await User.findOne({ _id: data._id, token: token });
      const token = req.params.token;
      const user = await User.findByJWT(token);

      if (!user) {
        throw new Error('User not found')
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(401).send({ error: 'Not authorized to access this resource' })
    }

  });

  // Update User
  router.put('/users', async (req, res, next) => {
    const user = await User.findByJWT(req.body.token);

    if (user) {
      if (req.body.password){
        user.set('password', req.body.password);
        user.set('token', '');
      }

      await user.save();

      res.status(204).json(user);
    }
    else {
      res.status(404).json("No user found");
    }

  });

  // Create User
  router.post('/users', async (req, res, next) => {
    try {
      const user = new User(req.body);
      await user.save()

      user.role = req.body.role || "user";
      const token = user.generateAuthToken();

      sendMail(user);

      res.status(201).json("User created");
    } catch (error) {
      res.status(400).send(error)
    }
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

  router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      if (!user) {
        return res.status(401).send({error: 'Login failed! Check authentication credentials'})
      }
      const token = await user.generateAuthToken();
      res.send({ user, token })
    } catch (error) {
      res.status(400).send(error)
    }

  })

};

module.exports = users;
