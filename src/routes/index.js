const express = require('express')
const routes = express.Router()
const multer = require("../app/middlewares/multer")

const ProductController = require("../app/controllers/ProductController")
const HomeController = require("../app/controllers/HomeController")
const SearchController = require('../app/controllers/SearchController')

//home
routes.get('/', HomeController.index)

//Search
routes.get('/products/search',SearchController.index)

//products
routes.get("/products/create", ProductController.create)
routes.get('/products/:id', ProductController.show)
routes.get("/products/:id/edit", ProductController.edit)

routes.post("/products", multer.array("photos", 6),ProductController.post)
routes.put("/products", multer.array("photos", 6), ProductController.put)

//Alias
routes.get("/ads/create", function(req, res){
  return res.redirect("/products/create")
})

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