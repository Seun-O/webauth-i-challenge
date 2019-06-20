exports.up = async knex => {
  return await knex.schema.createTable("users", tbl => {
    tbl.increments("id");
    tbl
      .string("username")
      .unique()
      .notNullable();
    tbl.string("password").notNullable();
  });
};

exports.down = async knex => {
  return await knex.schema.dropTable("users");
};
