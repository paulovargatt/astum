'use strict'

const Route = use('Route')

//User Routes




Route.group(() => {

  Route.post('/register', 'AuthController.register').validator('StoreUser')


  Route.post('/login', 'AuthController.login')
  Route.get('/teste', 'AuthController.teste')
  Route.post('/profile', 'AuthController.profile').middleware(['auth:jwt'])


 // Route.resource('app', 'App').middleware(['auth']).apiOnly();

}).prefix('api/v1')
