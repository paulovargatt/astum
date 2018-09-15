const User = require('../models/userModels');
const httpStatus = require('http-status-codes');


async function getAllUsers(req, res) {
  await User.find({})
    .populate('posts.postId')
    .populate('following.userFollowed')
    .populate('followers.follower')
    .then((result) => {
      return res.status(httpStatus.OK).json({ message: 'Usuários', result});
    }).catch((err) => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro', err});
    })
}

async function getUser(req, res) {
  await User.findOne({_id: req.params.id})
    .populate('posts.postId')
    .populate('following.userFollowed')
    .populate('followers.follower')
    .then((result) => {
      return res.status(httpStatus.OK).json({ message: 'User', result});
    }).catch((err) => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro', err});
    })
}

async function getUserByUsername(req, res) {
  await User.findOne({username : req.params.username})
    .populate('posts.postId')
    .populate('following.userFollowed')
    .populate('followers.follower')
    .then((result) => {
      return res.status(httpStatus.OK).json({ message: 'Username', result});
    }).catch((err) => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro', err});
    })
}

module.exports = {
  getAllUsers,
  getUser,
  getUserByUsername
};