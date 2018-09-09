const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userController');
const authHelper = require('../helpers/AuthHelper');


router.get('/users',authHelper.VerifyToken, UserCtrl.getAllUsers);

module.exports = router;