const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');

const User = require('../models/userModels');
const Helpers = require('../helpers/helpers');
const bcrypt = require('bcryptjs');
const dbConf = require('../config/secret');


module.exports = {
  async CreateUser(req, res){
    const schema = Joi.object().keys({
      username: Joi.string().min(5).max(10).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required()
    });

    const {error, value} = Joi.validate(req.body, schema);
    console.log(value)
    if(error && error.details){
      return res.status(HttpStatus.BAD_REQUEST).json({message: error.details})
    }

    const userEmail = await User.findOne({email: Helpers.lowerCase(req.body.email)});
    if(userEmail){
      return res.status(HttpStatus.CONFLICT).json({message: 'Email já cadastrado'})
    }

    const username = await User.findOne({username: Helpers.firstUpper(req.body.username)});
    if(username){
      return res.status(HttpStatus.CONFLICT).json({message: 'Username já cadastrado'})
    }

    return bcrypt.hash(value.password, 10, (err, hash) => {
      if(err){
        return res.status(HttpStatus.BAD_REQUEST).json({message: 'Erro hash password'})
      }
      const body = {
        username: Helpers.firstUpper(value.username),
        email: Helpers.lowerCase(value.email),
        password: hash
      };

      User.create(body).then((user) => {
        const token = jwt.sign({data: user}, dbConf.secret, {
          expiresIn: "1h"
        });
        res.cookie('auth', token);

        res.status(HttpStatus.CREATED).json({message: 'Usuário Criado com sucesso', user, token})
      }).catch(err => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Erro: '+ err})
      })
    });
  },

  async LoginUser(req, res){
    if(!req.body.username || !req.body.password){
      return res.status(HttpStatus.NOT_FOUND).json({message: 'Campos vazios', user, token});
    }
    await User.findOne({username: Helpers.firstUpper(req.body.username)}).then(user => {
      if(!user){
        return res.status(HttpStatus.NOT_FOUND).json({message: 'username nao encontrado'});
      }

      return bcrypt.compare(req.body.password, user.password).then((result) => {
        if(!result){
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Senha incorreta'});
        }
        const token = jwt.sign({data: user}, dbConf.secret, {
          expiresIn: "10000"
        });
        res.cookie('auth', token)
        return res.status(HttpStatus.OK).json({message: 'Login efetuado', user, token});

      });
    }).catch(err => {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Error', err});
    })
  }

};