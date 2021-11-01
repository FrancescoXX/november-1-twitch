const controller = require('../controllers/users');
const router = require('express').Router();

router
  .post('/', controller.createUser)

module.exports = router;