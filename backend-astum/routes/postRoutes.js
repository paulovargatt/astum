const express = require('express');
const router = express.Router();

const PostController = require('../controllers/PostController');
const authHelper = require('../helpers/AuthHelper');

router.post('/post/add-post', authHelper.VerifyToken, PostController.AddPost);

module.exports = router;