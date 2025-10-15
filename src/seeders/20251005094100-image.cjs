"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("image", [
      { 
        id: 1,
        element_id: 2,
        legend: null,
        source: '51867168665.jpg',
        alternative: "Dessin orangé d'un écran d'ordinateur avec le logo java script en haut à gauche.",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
      { 
        id: 2,
        element_id: 6,
        legend: "Exemples de blocs conditionnels if",
        source: '1918618151.jpg',
        alternative: "Exemple de code java script permettant d'illustrer les blocs conditionnels if.",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: null,
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('image', null, {});
  }
}