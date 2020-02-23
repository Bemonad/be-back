const express = require('express')
const router = express.Router();
const usersRouter = require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Welcome' });
});

usersRouter(router)

module.exports = router;
