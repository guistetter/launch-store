const User = require("../models/User");

function checkAllFields(body){
  //check if has all fields
  const keys = Object.keys(body);

  for (key of keys) {
    if (req.body[key] == "") {
      return {
        user: body,
        error: "Por favor, preencha todos os campos"
      };
    }
  }
}

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
  const fillAllFields = checkAllFields(req.body)
  if(fillAllFields){
    return res.render('user/register', fillAllFields)
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

async function update(req,res,next){
   //check if has all fields 
  const fillAllFields = checkAllFields(req.body)
  if(fillAllFields){
    return res.render('user/index', fillAllFields)
  }

  const { id, password } = req.body

  if(!password) return res.render("user/index",{
    user: req.body,
    error: 'Coloque sua senha para atualizar seu cadastro'
  })
  
  const user = await User.findOne({where: {id}})
  
}

module.exports = {
  post,
  show
};
