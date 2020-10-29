const crypto = require('crypto')
const User = require('../models/User')
const mailer = require('../../lib/mailer')

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
  async forgot(req,res){
    try {
        const user = req.user
        const token = crypto.randomBytes(20).toString('hex')
        let now = new Date()
        now = now.setHours(now.getHours() + 1)
        
      await User.update(user.id,{
        reset_token: token,
        reset_token_expires: now
      })
      await mailer.sendMail({
        to: user.email,
        from: 'no-reply@launchstore.com.br',
        subject: 'Recuperação de senha',
        html:`<h2>Perdeu a chave?</h2>
        <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
        <p>
          <a href="http://localhost:300/users/password-reset?token=${token}" target="_blank">
            Recuperar senha
          </a>
        </p>
        `
      })
      return res.render("session/forgot-password",{
        success: "Verifique seu email para resetar sua senha!"
      })
    } catch (error) {
      return res.render("session/forgot-password",{
        error: "Erro inesperado, tente novamente!"
      })
    }
  },
  resetForm(req,res){
    return res.render("session/password-reset",{
      token: req.query.token
    })
  },
  reset(req,res){}
}