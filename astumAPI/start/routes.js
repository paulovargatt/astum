'use strict'

const Route = use('Route')



Route.group(() => {

  //Auth Routes
  Route.post('/register', 'AuthController.register').validator('StoreUser')
  Route.post('/login', 'AuthController.login')



  Route.get('/profile', 'AuthController.profile').middleware(['auth:jwt'])
  Route.put('/user/:id', 'AuthController.updateUser').middleware(['auth:jwt']).validator('updateUser')
  Route.put('/profile', 'AuthController.updateProfile').middleware(['auth:jwt'])


 // Route.resource('app', 'App').middleware(['auth']).apiOnly();

}).prefix('api/v1')
