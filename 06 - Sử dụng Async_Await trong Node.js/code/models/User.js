const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: {
        type: 'string',
    },
    lastName: {
        type: 'string',
    },
    email: {
        type: 'string',
    },
    decks: [{
        type: Schema.Types.ObjectId,
        ref: 'Deck'
    }]
})

const User = mongoose.model('RhpUser', UserSchema)

module.exports = User