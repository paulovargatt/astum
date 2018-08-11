const express = require('express');
const router = express.Router();

const AuthCtrl = require('../controllers/Auth');

router.post('/register', AuthCtrl.CreateUser);
router.post('/login', AuthCtrl.LoginUser);

module.exports = router;