const Joi = require('joi');
const HttpStatus = require('http-status-codes');

//Models
const Post = require('../models/postModels');
const User = require('../models/userModels');

function AddPost(req, res) {
  const schema = Joi.object().keys({
    post: Joi.string().required()
  });
  const { error } = Joi.validate(req.body, schema);
  if (error && error.details) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details });
  }
  const body = {
    user: req.user._id,
    username: req.user.username,
    post: req.body.post,
    created: new Date()
  };
  Post.create(body).then(async (post) => {
    await User.update({ _id: req.user._id },
      {
        $push: {
          posts: {
            postId: post._id,
            post: req.body.post,
            created: new Date()
          }
        }
      });
    res.status(HttpStatus.OK).json({ message: 'Post Criado', post });
  }).catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ocorreu um erro' });
  });
}

async function getAllPosts(req, res) {
  try {
    const posts = await
      Post.find({})
        .populate('user')
        .sort({ created: -1 });
    return res.status(HttpStatus.OK).json({ message: 'Posts', posts });
  } catch (e) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error', e });
  }
}

async function AddLike(req, res) {
  const postId = req.body._id;
  await Post.update({
    _id: postId,
    'likes.username': {$ne: req.user.username},

  }, {
    $push: {
      likes: {
        username: req.user.username
      }
    },
    $inc: { totalLikes: 1 }
  }).then(()=>{
    return res.status(HttpStatus.OK).json({ message: 'Você curtiu esse post'});
  })
    .catch((e)=>{
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error', e });
    })

}

module.exports = {
  AddPost,
  getAllPosts,
  AddLike
};
