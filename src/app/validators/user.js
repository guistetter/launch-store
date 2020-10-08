const User = require("../models/User");

async function show(re,res, next){
  const { userId: id } = req.session;
  const user = await User.findOne({ where: { id } });

  if (!user)
  return res.render("user/index", {
    error: "Usuario não encontrado",
  });
  req.user = user
  next()
}
async function post(req, res, next) {
  //check if has all fields
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.render("user/register", {
        user: req.body,
        error: "Por favor, preencha todos os campos",
      });
    }
  }

  //check if user exists[emai, cpf_cnpj]
  let { email, cpf_cnpj, password, passwordRepeat } = req.body;
  cpf_cnpj = cpf_cnpj.replace(/\D/g, "");

  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj },
  });

  if (user)
    return res.render("user/register", {
      user: req.body,
      error: "Usuário já cadastrado.",
    });

  //check if password match
  if (password != passwordRepeat)
    return res.render("user/register", {
      user: req.body,
      error: "As senhas não batem.",
    });
  next();
}

module.exports = {
  post,
  show
};
