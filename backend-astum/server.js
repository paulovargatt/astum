const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use((req, res, next)  => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const dbConf = require('./config/secret');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extend: true, limit: '50mb'}));
app.use(cookieParser());
app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(dbConf.url, {useNewUrlParser: true});

const auth = require('./routes/authRoutes');
app.use('/api/astum', auth);

app.listen(3000, () => {
  console.log('Running')
});