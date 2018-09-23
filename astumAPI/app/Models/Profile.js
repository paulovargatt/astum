'use strict'

const Model = use('Model')

class Profile extends Model {

  static get table() {
    return 'profiles'
  }



}

module.exports = Profile
