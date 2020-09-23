const Category = require("../models/Category")
const Product = require("../models/Product")
const {formatPrice} = require("../../lib/utils")

module.exports = {
  create(req, res){
    //Pegar Categorias
    Category.all().then(function(results){
      const categories = results.rows;
      return res.render("products/create.njk",{ categories })
    }).catch(function(err){
      throw new Error(err)
    })
  },
  async post(req, res){
    //Logica de Salvar
    const keys = Object.keys(req.body)

    for( key of keys){
      if (req.body[key] == ""){
        return res.send("Preencha todos os campos")
      }
    }

   let results = await Product.create(req.body)
   const productId = results.rows[0].id

   results = await Category.all()
   const categories = results.rows
   return res.redirect(`/products/${productId}`)
  },
  async edit(req,res){
    let results = await Product.find(req.params.id)
    const product = results.rows[0]
 
    if(!product) return res.send("Produto nao encontrado")
    product.price = formatPrice(product.price)
    product.old_price = formatPrice(product.old_price)

    results = await Category.all()
    const categories = results.rows

    return res.render("products/edit.njk", {product, categories})
  }
}