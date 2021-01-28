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
    throw new Error('Random error')
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

module.exports = {
    // index: index
    index,
    newUser
}