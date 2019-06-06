const knex = require("knex");
const config = {
  client: "sqlite3",
  connection: {
    filename: "./database/dev.sqlite3"
  },
  useNullAsDefault: true
};

const db = knex(config);

const addUser = user => {
  return db("users").insert(user);
};

const find = username => {
  return db("users")
    .first()
    .where({ username: username });
};

const getUsers = () => {
  return db("users");
};

// Test database helper functions

/*
const execute = async () => {
  const data = await find("akali");
  console.log(data);
};

execute();
*/

module.exports = {
  addUser,
  getUsers,
  find
};
