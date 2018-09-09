const express = require('express');
const router = express.Router();
const FriendsCtrl = require('../controllers/FriendsController');
const authHelper = require('../helpers/AuthHelper');


router.post('/follow-user',authHelper.VerifyToken, FriendsCtrl.followUser);

module.exports = router;