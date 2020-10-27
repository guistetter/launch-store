const {formatPrice, date} = require("../../lib/utils")

const Category = require("../models/Category")
const Product = require("../models/Product")
const File = require("../models/File")

module.exports = {
  // async index(req, res){
  //   let results = await Product.all()
  //   const products = results.rows
  
  //   if(!products) return res.send("Products not found!")

  //   async function getImage(productId){
  //     let results = await Product.files(productId)
  //     const files = results.rows.map(file =>
  //       `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
  //     )
  //     return files[0]
  //   } 
  //   const productsPromise = products.map(async product => {
  //     product.img = await getImage(product.id)
  //     product.price = formatPrice(product.price)
  //     product.oldPrice = formatPrice(product.old_price)
  //     return product
  //   }).filter((product, index) => index > 2 ? false : true)
  //   //filtro para listar apenas 3 itens

  //   const lastAdded = await Promise.all(productsPromise)
  //   return res.render("home/index",{products: lastAdded})
  // },
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
  }
}