const db = require("../../config/db")
module.exports = {
  create(data){
    const query = `
      insert into products (
        category_id,
        user_id,
        name,
        description,
        old_price,
        price,
        quantity,
        status
      ) values ($1, $2, $3, $4, $5, $6, $7, $8)
      returning id
    `
    //R$ 1,00
    data.price =  data.price.replace(/\D/g,"")
    //100 devo dividir por 100 depois...
    const values = [
      data.category_id,
      data.user_id || 1,
      data.name,
      data.description,
      data.old_price || data.price,
      data.price,
      data.quantity,
      data.status || 1
    ] 
    return db.query(query, values)
  },
  find(id){
    return db.query(`select * from products where id = $1`,[id])
  }
}