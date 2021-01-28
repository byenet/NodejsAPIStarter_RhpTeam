const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

router.route('/')
    .get(userController.index)
    .post(userController.newUser)
    .patch()
    .put()
    .delete()

module.exports = router