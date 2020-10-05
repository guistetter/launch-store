const db = require("../../config/db");
module.exports = {
  async findOne(filters) {
    let query = "select * from users";

    Object.keys(filters).map((key) => {
      //Where | or
      query = `${query}
      ${key}`;

      Object.keys(filters[key]).map((field) => {
        query = `${query} ${field} = '${filters[key][field]}'`;
      });
    });
    const results = await db.query(query);
    return results.rows[0];
  },
};
