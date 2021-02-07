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
        // ref phai trung voi ten model minh export ra 
        ref: 'Deck'
    }]
})

// database se tao ra 1 colection co ten rhpusers
const User = mongoose.model('RhpUser', UserSchema)

module.exports = User