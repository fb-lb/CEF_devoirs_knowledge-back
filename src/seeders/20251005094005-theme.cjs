"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("theme", [
      { 
        id: 1,
        name: 'Informatique',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
      { 
        id: 2,
        name: 'Cuisine',
        order: 4,
        createdAt: new Date(Date.now() - (1000 * 3600 * 76)),
        updatedAt: new Date(),
        createdBy: 2,
        updatedBy: 1,
      },
      { 
        id: 3,
        name: 'Jardinage',
        order: 3,
        createdAt: new Date(Date.now() - (1000 * 3600)),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 2,
      },
      { 
        id: 4,
        name: 'Musique',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('theme', null, {});
  }
}