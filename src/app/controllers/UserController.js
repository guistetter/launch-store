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
    const { email, cpf_cnpj, password, passwordRepeat } = req.body;
    console.log(email);

    const user = await User.findOne({
      where: { email },
      or: { cpf_cnpj },
    });

    if (user) return res.send("User exists");

    //check if password match
    if (password != passwordRepeat) return res.send("Password Mismatch");
    return res.send("passou");
  },
};
