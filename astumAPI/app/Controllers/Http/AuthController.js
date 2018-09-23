'use strict'
const User = use('App/Models/User');
const Profile = use('App/Models/Profile');


class AuthController {

  async register({request, response, auth}){
    const data = request.only(['email', 'password'])

    if(data.email && data.password){
      const user = await User.create(data)
      const token = await auth.attempt(data.email, data.password)

      const profile = new Profile();
      profile.user_id = user.id;
      profile.pais_id = 1;
      profile.desc = user.name;
      await profile.save();


      return response.json({
        status: 200,
        token,
        user
      });
    }
    else{
      return response.json({
        'message': 'Insira seus dados'
      })
    }
  }

  async login({response, request, auth}){
    const {email, password} = request.all();
    const token = await auth.attempt(email, password)
    let user = await User.query().where('email',email).fetch()
    return response.json({
      token,
      user
    })
  }

  async profile({response, auth, request}){
    const user = await auth.getUser();
    return user;
  }


  async revokeToken({response, auth, request}){
    const user = await auth.getUser();
    await user.token;
  }


  async teste({response, auth, request}){
    const estado = await Estado.query()
    .fetch()



    return estado
  }



}

module.exports = AuthController
