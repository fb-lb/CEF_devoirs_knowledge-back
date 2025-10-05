"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("element", [
      { 
        id: 1,
        type: 'Informatique',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('element', null, {});
  }
}