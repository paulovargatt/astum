const express = require('express');
const router = express.Router();

const PostController = require('../controllers/PostController');
const authHelper = require('../helpers/AuthHelper');

router.get('/posts',authHelper.VerifyToken, PostController.getAllPosts);
router.get('/post/:id',authHelper.VerifyToken, PostController.getPost);

router.post('/post/add-post', authHelper.VerifyToken, PostController.AddPost);
router.post('/post/add-like', authHelper.VerifyToken, PostController.AddLike);
router.post('/post/add-comment', authHelper.VerifyToken, PostController.AddComment);

module.exports = router;