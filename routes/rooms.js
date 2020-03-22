const Room = require('../models/room');

const rooms = (router) => {
  // Get all rooms
  router.get('/rooms', function (req, res, next) {

    Room.find(function (err, rooms) {
      if (err)
        console.log(err);

      res.json(rooms);
    });

  });

  // Get one Room (By ID)
  router.get('/rooms/:id', function (req, res, next) {

    const id = req.params.id;

    Room.findById(id,function (err, room) {
      if (err)
        console.log(err);

      res.json(room);
    });

  });

  // Update Room
  router.put('/rooms/:id', function (req, res, next) {

    const id = req.params.id;

    Room.findById(id, function (err, room) {
      if (err)
        console.log(err);

      if (room) {

        room.name = req.body.name;
        room.description = req.body.description;
        room.capacity_sit = req.body.capacity_sit;
        room.capacity_stand = req.body.capacity_stand;

        room.save(function (err, roomUpdated) {
          if (err)
            console.log(err);

          res.json(roomUpdated);
        });
      }
      else {
        res.json("No room found");
      }

    });
  });

  // Create Room
  router.post('/rooms', function (req, res, next) {

    const room = new Room();

    room.name = req.body.name;
    room.description = req.body.description;
    room.capacity_sit = req.body.capacity_sit;
    room.capacity_stand = req.body.capacity_stand;

    room.save(function (err) {
      if (err)
        console.log(err);

      res.json("Room created");
    });
  });

  // Delete Room
  router.delete('/rooms/:id', function (req, res, next) {

    const id = { _id: req.params.id };

    Room.deleteOne(id, function (err, prom) {
      if (err)
        console.log(err);

      res.json(prom);
    });
  });

};

module.exports = rooms;
