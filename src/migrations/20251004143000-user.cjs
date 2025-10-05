"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("user", {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            firstName: {
                type: Sequelize.STRING(60),
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING(60),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(80),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            roles: {
                type: Sequelize.JSON,
                allowNull: false,
                defaultValue: ["user"],
            },
            isVerified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedBy: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true,
                references: {
                    model: "user",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("user");
    },
}