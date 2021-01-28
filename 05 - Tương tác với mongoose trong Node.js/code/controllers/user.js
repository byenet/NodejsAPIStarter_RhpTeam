/**
 * 
 *  We can interact with mongoose in three diffirent way:
 *  Callback
 *  promises
 *  Async/await 
 */

const User = require('../models/User');

// const index = (req, res, next) => {
    // Callback way
    // User.find({}, (err, users) => {
    //     if (err) next(err);
    //     return res.status(200).json({users});
    // })
// }

const index = (req, res, next) => {
    // promise way
    User.find({})
        .then((users) => {
            res.status(200).json({ users });
        })
        .catch((err) => next(err));
};



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


const newUser = (req, res, next) => {
    console.log("req.body content: ", req.body);

    // create object model
    const newUser = new User(req.body);
    console.log("newUser ", newUser);

    newUser.save().then(user =>{
        console.log("User saved", user);
        // return res.status(201).json({user: user})
        return res.status(201).json({ user });
    }).catch(err => next(err));
};

module.exports = {
    // index: index
    index,
    newUser
}