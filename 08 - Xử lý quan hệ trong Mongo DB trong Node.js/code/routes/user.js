const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const userController = require('../controllers/user')

router.route('/')
    .get(userController.index)
    .post(userController.newUser)

router.route('/:userID')
    .get(userController.getUser)
    .put(userController.replaceUser)
    .patch(userController.updateUser)

router.route('/:userID/decks')
    .get(userController.getUserDecks)
    .post(userController.newUserDeck)

module.exports = router