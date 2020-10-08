const User = require("../models/User");
const { formatCep, formatCpfCnpj } = require("../../lib/utils");
const { put } = require("../../routes/users");
const { update } = require("../models/Product");

module.exports = {
  registerForm(req, res) {
    return res.render("user/register");
  },
  async show(req, res) {
    const {user} = req
    
    user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj);
    user.cep = formatCep(user.cep);

    return res.render("user/index", { user });
  },
  async post(req, res) {
    try {
      const userId = await User.create(req.body);

      req.session.userId = userId;

      return res.redirect("/users");
    } catch (err) {
      return console.log(err);
    }
  },
  async update(req,res){
    return ''
  }
};
