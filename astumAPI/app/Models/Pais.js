'use strict'

const Model = use('Model')

class Pais extends Model {

  static get table() {
    return 'pais'
  }
}

module.exports = Pais
