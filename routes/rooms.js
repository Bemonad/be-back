const Room = require('../models/room');
const crud = require('../services/crud');

const rooms = (router) => {
  router.use('/rooms', crud(Room));
};

module.exports = rooms;
