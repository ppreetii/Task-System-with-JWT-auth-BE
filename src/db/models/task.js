const Sequelize = require("sequelize");

const sequelize = require("../../utils/config/database");
const User = require("./user.js")

const Task = sequelize.define(
  "task",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    due_date: {
      type: Sequelize.DATEONLY
    },
    attachment: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user: {
      type: Sequelize.INTEGER,
      references: { model: User, key: 'id' }
    }
  },
  { timestamps: true }
);


module.exports = Task;