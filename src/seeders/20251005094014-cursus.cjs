"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cursus", [
      { 
        id: 1,
        theme_id: 1,
        name: "Cursus d'initiation au développement web",
        price: 60,
        order: 1,
        createdAt: new Date(Date.now() - (1000 * 3600 * 276)),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      { 
        id: 2,
        theme_id: 2,
        name: "Cursus d'initiation à l'art du dressage culinaire",
        price: 48,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 2,
        updatedBy: null,
      },
      { 
        id: 3,
        theme_id: 4,
        name: "Cursus d'initiation à la guitare",
        price: 50,
        order: 1,
        createdAt: new Date(Date.now() - (1000 * 3600 * 46)),
        updatedAt: new Date(),
        createdBy: 2,
        updatedBy: 1,
      },
      { 
        id: 4,
        theme_id: 2,
        name: "Cursus d'initiation à la cuisine",
        price: 44,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 2,
        updatedBy: null,
      },
      { 
        id: 5,
        theme_id: 3,
        name: "Cursus d'initiation au jardinage",
        price: 30,
        order: 1,
        createdAt: new Date(Date.now() - (1000 * 3600 * 146)),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 2,
      },
      { 
        id: 6,
        theme_id: 4,
        name: "Cursus d'initiation au piano",
        price: 50,
        order: 2,
        createdAt: new Date(Date.now() - (1000 * 3600 * 56)),
        updatedAt: new Date(),
        createdBy: 2,
        updatedBy: 2,
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('cursus', null, {});
  }
}