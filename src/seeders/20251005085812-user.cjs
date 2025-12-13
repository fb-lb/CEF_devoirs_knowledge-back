"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("user", [
      { 
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.com',
        password: await bcrypt.hash('PassWord-12345-!', 10),
        roles: JSON.stringify(['user', 'admin']),
        isVerified: true,
        createdAt: new Date(Date.now() - (1000 * 3600 * 100)),
        updatedAt: new Date(Date.now() - (1000 * 3600 * 100)),
        updatedBy: null,
      },
      { 
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@test.com',
        password: await bcrypt.hash('PassWord-12345-!', 10),
        roles: JSON.stringify(['user', 'admin']),
        isVerified: true,
        createdAt: new Date(Date.now() - (1000 * 3600 * 42)),
        updatedAt: new Date(),
        updatedBy: 1,
      },
      { 
        id: 3,
        firstName: 'Jack',
        lastName: 'Doe',
        email: 'jack.doe@test.com',
        password: await bcrypt.hash('PassWord-12345-!', 10),
        roles: JSON.stringify(['user']),
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: null,
      },
      { 
        id: 4,
        firstName: 'James',
        lastName: 'Doe',
        email: 'james.doe@test.com',
        password: await bcrypt.hash('PassWord-12345-!', 10),
        roles: JSON.stringify(['user']),
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: null,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
  }
}