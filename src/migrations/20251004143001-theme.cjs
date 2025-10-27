"use strict";

module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable("theme", {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            order: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            createdBy: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true,
                references: {
                    model: "user",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            updatedBy: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true,
                defaultValue: null,
                references: {
                    model: "user",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("theme");
    },
}