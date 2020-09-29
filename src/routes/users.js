const express = require('express')
const routes = express.Router()

//login/logout
routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionController.login)
routes.post('/logout', SessionController.logout)

//reset password/forgot
routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/password-reset', SessionController.resetForm)
routes.post('/forgot-password', SessionController.forgot)
routes.post('/password-reset', SessionController.reset)

//user register UserController
routes.get('/register', UserController.registerForm)
routes.post('/register', UserController.post)

routes.get('/', UserController.show)
routes.put('/', UserController.update)
routes.delete('/', UserController.delete)
module.exports = routes