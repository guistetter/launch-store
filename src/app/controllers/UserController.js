const User = require("../models/User");
module.exports = {
  registerForm(req, res) {
    return res.render("user/register");
  },

  async post(req, res) {
    //check if has all fields
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os campos");
      }
    }

    //check if user exists[emai, cpf_cnpj]
    const { email, cpf_cnpj } = req.body;

    const user = await user.findOne({
      where: email,
      or: { cpf_cnpj },
    });

    //check if password match
  },
};
