const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());

const dbConf = require('./config/secret');

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use((req, res, next)  => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extend: true, limit: '50mb'}));
app.use(cookieParser());
app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(dbConf.url, {useNewUrlParser: true});

const auth = require('./routes/authRoutes');
const posts = require('./routes/postRoutes');
const users = require('./routes/userRoutes');
const friends = require('./routes/friendsRoutes');

require('./socket/streams')(io);

app.use('/api/astum', auth);
app.use('/api/astum', posts);
app.use('/api/astum', users);
app.use('/api/astum', friends);

server.listen(3000, () => {
  console.log('Running')
});