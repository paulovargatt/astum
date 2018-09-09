const User = require('../models/userModels');
const httpStatus = require('http-status-codes');


function followUser(req, res) {
  const followUser = async () => {
    await User.update({
      _id: req.user._id,
        'following.userFollowed': {$ne: req.body.userFollowed}
      },
      {
        $push: {
          following: {
            userFollowed: req.body.userFollowed
          }
      }
   });
    await User.update({
        _id: req.body.userFollowed,
        'following.follower': {$ne: req.body._id}
      },
      {
        $push: {
          followers: {
            follower: req.user._id
          }
        }
      });
  };

  followUser()
    .then(() => {
      return res.status(httpStatus.OK).json({ message: 'Seguindo Usuário'});

    })
    .catch(err => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro', err});

    })
}

module.exports = {
  followUser
};