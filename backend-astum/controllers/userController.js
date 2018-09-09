const User = require('../models/userModels');
const httpStatus = require('http-status-codes');


async function getAllUsers(req, res) {
  await User.find({})
    .populate('posts.postId')
    .then((result) => {
      return res.status(httpStatus.OK).json({ message: 'Usuários', result});
    }).catch((err) => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro', err});
    })
}

module.exports = {
  getAllUsers
};