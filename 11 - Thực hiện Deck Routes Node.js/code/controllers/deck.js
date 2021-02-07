
const User = require('../models/User');
const Deck = require('../models/Desk');

// async function
const index = async (req, res, next) => {
  const decks = await Deck.find({})

  return res.status(200).json({ decks })
}

// async await way
const newDeck = async (req, res, next) => {
  // Find owner
  const owner = await User.findById(req.value.body.owner)

  // Create a new deck
  const deck = req.value.body
  delete deck.owner

  deck.owner = owner._id
  const newDeck = new Deck(deck)
  await newDeck.save()

  console.log('owner ', owner)
  // Add newly created deck to the actual decks
  owner.decks.push(newDeck._id)
  await owner.save()

  return res.status(201).json({ deck: newDeck })
  
}


module.exports = {
  // index: index
  index,
  newDeck
}