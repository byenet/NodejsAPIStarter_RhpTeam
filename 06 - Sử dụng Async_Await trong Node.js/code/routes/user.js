const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const userController = require('../controllers/user')

router.route('/')
    .get(userController.index)
    .post(userController.newUser)

module.exports = router