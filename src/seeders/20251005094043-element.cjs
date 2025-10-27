"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("element", [
      { 
        id: 1,
        lesson_id: 1,
        type: 'text',
        order: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
      { 
        id: 2,
        lesson_id: 1,
        type: 'image',
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
      { 
        id: 3,
        lesson_id: 1,
        type: 'text',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
      { 
        id: 4,
        lesson_id: 1,
        type: 'text',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
      { 
        id: 5,
        lesson_id: 1,
        type: 'text',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
      { 
        id: 6,
        lesson_id: 1,
        type: 'image',
        order: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
      { 
        id: 7,
        lesson_id: 1,
        type: 'text',
        order: 6,
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