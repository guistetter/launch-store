const db = require("../../config/db");

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
};
