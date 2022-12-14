const { User } = require('../models');

const userController = {
    
    // get all users
    getAllUsers(req,res) {
      User.find({})
      .populate({
            path: 'thoughts',
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // If no user is found, send 404 
                if (!dbUserData) {
                    res.status(404).json({ message: ' No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
             })
             .catch(err => {
                console.log(err);
                res.status(400).json(err);
             })
        },
    
    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        console.log('params', params)
        console.log('body', body)
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            console.log('user data', dbUserData)
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

  // add friend to user
   addFriend({ params, body}, res) {
    console.log('params', params)
    console.log('body', body);
    User.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.friendId } }, { new: true, runValidators: true })
    .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
    .catch(err => res.json(err));
  },
  
 // delete friend from user
 deleteFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } })
    .then(dbUserData => {
        if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = userController