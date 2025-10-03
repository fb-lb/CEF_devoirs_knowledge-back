"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
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
                type: Sequelize.INTEGER,
                allowNull: true,
                reference: {
                    model: "users",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
}