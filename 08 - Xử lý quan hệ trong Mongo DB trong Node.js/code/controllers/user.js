/**
 * 
 *  We can interact with mongoose in three diffirent way:
 *  Callback
 *  promises
 *  Async/await 
 */

const User = require('../models/User');
const Deck = require('../models/Desk');

const getUser = async (req, res, next) => {
    console.log('req params: ', req.params);
    const { userID } = req.params

    const user = await User.findById(userID)
    console.log('user info ', user);

    return res.status(200).json({ user })
}

const getUserDecks = async (req, res, next) => {
    const { userID } = req.params

    // Get user
    const user = await User.findById(userID).populate('decks')
    // console.log('user decks ', user.decks);
    return res.status(200).json({ decks: user.decks })
}


// const index = (req, res, next) => {
// Callback way
// User.find({}, (err, users) => {
//     if (err) next(err);
//     return res.status(200).json({users});
// })
// }

// const index = (req, res, next) => {
//     // promise way
//     User.find({})
//         .then((users) => {
//             res.status(200).json({ users });
//         })
//         .catch((err) => next(err));
// };

// async function
const index = async (req, res, next) => {
    // khi khong co express-promise-router thi phai dung try catch
    // try {
    //     const users = await User.find({})
    //     throw new Error('Random error')
    //     return res.status(200).json({ users })
    // } catch (err) {
    //     next(err);
    // }

    // khi da require express-promise-router ben router thay cho express.router() roi thi no se tu quang loi khong can try catch nua
    const users = await User.find({})
    // throw new Error('Random error')
    return res.status(200).json({ users })

}



// const newUser = (req, res, next) => {
//     console.log('req.body content: ', req.body);

//     // create object model
//     const newUser = new User(req.body)
//     console.log('newUser ', newUser);
//     newUser.save((err,user) => {
//         console.error("Error ", err);
//         console.log("User saved", user);
//         // return res.status(201).json({user: user})
//         return res.status(201).json({user})
//     })
// }


// const newUser = (req, res, next) => {
//     console.log("req.body content: ", req.body);

//     // create object model
//     const newUser = new User(req.body);
//     console.log("newUser ", newUser);

//     newUser.save().then(user => {
//         console.log("User saved", user);
//         // return res.status(201).json({user: user})
//         return res.status(201).json({ user });
//     }).catch(err => next(err));
// };


// async await way
const newUser = async (req, res, next) => {
    // khi khong co express-promise-router thi phai dung try catch
    // try {
    //     const newUser = new User(req.body);
    //     console.log("newUser ", newUser);

    //     await newUser.save()

    //     return res.status(201).json({ user: newUser })
    // } catch (err) {
    //     next(err);
    // }

    // khi da require express-promise-router ben router thay cho express.router() roi thi no se tu quang loi khong can try catch nua

    const newUser = new User(req.body);
    console.log("newUser ", newUser);

    await newUser.save()

    return res.status(201).json({ user: newUser })

}

const newUserDeck = async (req, res, next) => {
    const { userID } = req.params

    // Create a new deck
    const newDeck = new Deck(req.body)

    // Get user
    const user = await User.findById(userID)
    // console.log(user);

    // Assign user as a deck's owner
    newDeck.owner = user
    // console.log(newDeck);

    // Save the deck
    await newDeck.save()

    // Add deck to user's decks array 'decks'
    user.decks.push(newDeck._id)

    // Save the user
    await user.save()

    res.status(201).json({ deck: newDeck })
}

const replaceUser = async (req, res, next) => {
    // enforce new user to old user
    const { userID } = req.params

    const newUser = req.body

    const result = await User.findByIdAndUpdate(userID, newUser)

    return res.status(200).json({ success: true })
}

const updateUser = async (req, res, next) => {
    // number of files
    const { userID } = req.params
    const newUser = req.body
    const result = await User.findByIdAndUpdate(userID, newUser)
    return res.status(200).json({ success: true })
}


module.exports = {
    // index: index
    index,
    newUser,
    getUser,
    updateUser,
    replaceUser,
    getUserDecks,
    newUserDeck
}