'use strict'
const User = use('App/Models/User');
const Profile = use('App/Models/Profile');


class AuthController {

  async register({ request, response, auth }) {
    const data = request.only(['email', 'password'])

    if (data.email && data.password) {
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
    else {
      return response.json({
        'message': 'Insira seus dados'
      })
    }
  }

  async login({ response, request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password)
    let user = await User.query()
      .where('email', email)
      .with('profile')
      .fetch()
    return response.json({
      token,
      user
    })
  }

  async profile({ response, auth, request }) {
    try {
      const user = await auth.getUser();
      const profile = await User.query()
        .where('id', user.id)
        .with('profile')
        .first();
      return profile;
    }
    catch (error) {
      response.send('Insira um token válido')
    }

  }

  async updateProfile({ response, auth, request }) {
    let { sexo, foto, desc, uf_id, city_id } = request.all();
    const getAuth = await auth.getUser();
    const user = await User.findOrFail(getAuth.id)
    try {
      await
       user.profile()
           .update({ sexo, foto, desc, uf_id, city_id });
      return response.json({
        status: 200,
        message: `Certo ${user.name}, seu perfil foi atualizado com sucesso`,
        user: await user.profile().fetch()
      });
    }catch(e){
      response.send('Erro ao Atualizar', e)
    }
  }

  async updateUser({ response, auth, request }) {
    let { name, email, password} = await request.all();
    const getAuth = await auth.getUser();
    const user = await User.findOrFail(getAuth.id)
    let pass = user.password;

    try {
      user.name = name;
      user.email = email;
      password != null ? user.password = password : user.password = pass;
      await user.save();

      return response.json({
        status: 200,
        message: `Certo, seus dados foram atualizados`,
        user: await user
      });
    }catch(e){
      response.send('Erro ao Atualizar', e)
    }
  }




  async revokeToken({ response, auth, request }) {
    const user = await auth.getUser();
    await user.token;
  }


  async teste({ response, auth, request }) {
    const estado = await Estado.query()
      .fetch()



    return estado
  }



}

module.exports = AuthController
