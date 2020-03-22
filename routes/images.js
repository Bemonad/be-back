const Image = require('../models/image');
const crud = require('../services/crud');

const images = (router) => {
  router.use('/images', crud(Image));
};

module.exports = images;
