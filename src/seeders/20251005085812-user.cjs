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
        password: await bcrypt.hash('00000000', 10),
        roles: JSON.stringify(['user', 'admin']),
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: null,
      },
      { 
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@test.com',
        password: await bcrypt.hash('00000000', 10),
        roles: JSON.stringify(['user', 'admin']),
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: null,
      },
      { 
        id: 3,
        firstName: 'Jack',
        lastName: 'Doe',
        email: 'jack.doe@test.com',
        password: await bcrypt.hash('00000000', 10),
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
        password: await bcrypt.hash('00000000', 10),
        roles: JSON.stringify(['user']),
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: null,
      }
    ], {})
    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}