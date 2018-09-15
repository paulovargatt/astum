const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userController');
const authHelper = require('../helpers/AuthHelper');


router.get('/users',authHelper.VerifyToken, UserCtrl.getAllUsers);
router.get('/user/:id',authHelper.VerifyToken, UserCtrl.getUser);
router.get('/user/:username',authHelper.VerifyToken, UserCtrl.getUserByUsername);

module.exports = router;