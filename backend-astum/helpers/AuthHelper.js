const jwt = require('jsonwebtoken');
const httpStatus = require('http-status-codes');
const dbConfig = require('../config/secret');

module.exports = {
  VerifyToken: (req, res, next) => {
    if(!req.headers.authorization){
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({message: 'Não autorizado'})
    }
    const token = req.cookies.auth || req.headers.authorization.split(' ')[1];
    if(!token){
      return res.status(httpStatus.FORBIDDEN).json({message: 'Sem token'});
    }

    return jwt.verify(token, dbConfig.secret, (err, decoded) => {
      if(err){
        if(err.expiredAt < new Date()){
          return res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({
              message: 'Token expirado',
              token: null
          });
        }
        next();
      }
      req.user = decoded.data;
      next();
    });
  }
}