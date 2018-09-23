'use strict'

class updateUser {
  get rules() {
    const userId = this.ctx.params.id;
    return {
      email: `required|unique:users,email,id,${userId}`
    }
  }

  get messages() {
    return {
      'email.required': 'Campo Requerido',
      'email.unique': 'Email já cadastrado',
    }
  }
}

module.exports = updateUser
