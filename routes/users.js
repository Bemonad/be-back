const User = require('../models/user')

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

    const user = new User();

    user.firstName = "Gerard"
    user.lastName = "Menvussa"
    user.email = "john@doe.com"

    user.save(function (err) {
      if (err)
        res.send(err);

      res.json("User created");
    });
  });
}

module.exports = users;
