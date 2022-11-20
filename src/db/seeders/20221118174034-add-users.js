'use strict';
const users = require('../../utils/data/user')
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', users);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
