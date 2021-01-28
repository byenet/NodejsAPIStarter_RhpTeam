const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

router.route('/users')
    .get(userController.index)
    .post()
    .patch()
    .put()
    .delete()

module.exports = router