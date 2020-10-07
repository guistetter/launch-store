const db = require("../../config/db");
const { hash } = require("bcryptjs");

module.exports = {
  async findOne(filters) {
    try {
      let query = `SELECT *
      FROM users`;

      Object.keys(filters).map((key) => {
        // WHERE | OR | AND
        query = `${query}
        ${key}
      `;
        Object.keys(filters[key]).map((field) => {
          // email | cpf_cnpj
          query = `${query} users.${field} = '${filters[key][field]}'`;
        });
      });

      const results = await db.query(query);

      return results.rows[0];
    } catch (err) {
      console.error(err);
    }
  },
  async create(data) {
    try {
      const query = `
      insert into users (
        name,
        email,
        password,
        cpf_cnpj,
        cep,
        address
      ) values ($1, $2, $3, $4, $5, $6)
      returning id
    `;

      //hash de senha
      const passwordHash = await hash(data.password, 8);

      const values = [
        data.name,
        data.email,
        passwordHash,
        data.cpf_cnpj.replace(/\D/g, ""),
        data.cep.replace(/\D/g, ""),
        data.address,
      ];

      const results = await db.query(query, values);
      return results.rows[0].id;
    } catch (err) {
      return console.log(err);
    }
  },
};
