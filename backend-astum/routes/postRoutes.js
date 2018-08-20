const express = require('express');
const router = express.Router();

const PostController = require('../controllers/PostController');
const authHelper = require('../helpers/AuthHelper');

router.get('/posts',authHelper.VerifyToken, PostController.getAllPosts);
router.post('/post/add-post', authHelper.VerifyToken, PostController.AddPost);
router.post('/post/add-like', authHelper.VerifyToken, PostController.AddLike);

module.exports = router;