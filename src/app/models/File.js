const db = require("../../config/db")
module.exports = {
  create({filename, path, product_id}){
    const query = `
      insert into files (
        name,
        path
        product_id,
        name
        ) values ($1, $2, $3)
      returning id
    `
    const values = [
      filename,
      path,
      product_id
    ] 
    return db.query(query, values)
  }
}