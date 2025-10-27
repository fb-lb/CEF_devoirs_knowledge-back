"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("text", [
      { 
        id: 1,
        element_id: 1,
        type: 'title2',
        content: 'Les conditions',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
      { 
        id: 2,
        element_id: 3,
        type: 'title2',
        content: 'Les variables',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
      { 
        id: 3,
        element_id: 4,
        type: 'paragraph',
        content: 'loremLorem ipsum, dolor sit amet consectetur adipisicing elit. Quae veniam nobis facere quia delectus corrupti soluta voluptatem doloremque doloribus atque fugiat, aperiam officiis culpa? Consequuntur incidunt veritatis odit repellat dolores.',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
      { 
        id: 4,
        element_id: 5,
        type: 'title1',
        content: 'Les bases',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
      { 
        id: 5,
        element_id: 7,
        type: 'paragraph',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum molestiae numquam cum sed quod aliquid veniam minima earum quidem corporis distinctio illo, suscipit omnis ullam nulla. Nisi sit accusantium consequatur?',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('text', null, {});
  }
}