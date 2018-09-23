'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {

  async handle (error, { request, response }) {
    response.status(error.status).json({
     message: error.message,
    })
  }



}

module.exports = ExceptionHandler
