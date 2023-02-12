const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const headCount = async () =>
  User.aggregate()
  .count("userCount")
  .then((numberOfUsers) => numberOfUsers);


const grade = async (userId) =>
  User.aggregate([
    
    
      
      { $match: {_id: ObjectId (userId)}},
    
    {
      $unwind: '$friends',
    },
    
    {
      $group: {
        _id: ObjectId(userId),
        overallFriends: { $avg: '$friends.amount'},
      }
      
    },
  ]);

module.exports = {

  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          headCount: await headCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.studentId })
      .select('-__v')
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
              amount: await amount(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Course.findOneAndUpdate(
              { users: req.params.studentId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((course) =>
        !Thought
          ? res.status(404).json({
              message: 'User deleted, but no thougths found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

