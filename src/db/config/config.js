const dotenv = require("dotenv");

dotenv.config({path:__dirname+'/./../../../.env'})

const { HOST, USER, PASSWORD, DATABASE, DIALECT, TEST_DB, PROD_DB } =
  process.env;

module.exports = {
  development: {
    username: USER,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    dialect: DIALECT,
    seederStorage: "sequelize",
    logging: false
  },
  test: {
    username: USER,
    password: PASSWORD,
    database: TEST_DB,
    host: HOST,
    dialect: DIALECT,
    seederStorage: "sequelize",
    logging: false
  },
  production: {
    username: USER,
    password: PASSWORD,
    database: PROD_DB,
    host: HOST,
    dialect: DIALECT,
    seederStorage: "sequelize",
    logging:false
  },
};
