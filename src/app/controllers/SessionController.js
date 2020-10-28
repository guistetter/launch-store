const {formatPrice, date} = require("../../lib/utils")

module.exports = {
 
  loginForm(req,res){
    return res.render("session/login")
  },
  login(req,res){
    //check user exists in database, check password match, post user in req.session
    req.session.userId = req.user.id
    return res.redirect("/users")
  },
  logout(req,res){
    req.session.destroy()
    return res.redirect("/")
  },
  forgotForm(req,res){
    return res.render("session/forgot-password")
  },
  forgot(req,res){
    return res.render("session/forgot")
  },
}