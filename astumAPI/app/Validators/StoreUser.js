'use strict'

class StoreUser {

get rules () {
    return {
      email: 'required|unique:users,email',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'Campo Requerido',
      'email.unique': 'Email já cadastrado',
      'password.required': 'Campo Requerido'
    }
  }

}

module.exports = StoreUser
