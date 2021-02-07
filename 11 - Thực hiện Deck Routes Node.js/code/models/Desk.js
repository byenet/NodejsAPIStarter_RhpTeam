const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeckSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    total: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        // ref phai trung voi ten model minh export ra 
        ref: 'RhpUser'
    }
})

// database se tao ra 1 colection co ten decks
const Deck = mongoose.model('Deck', DeckSchema)
module.exports = Deck