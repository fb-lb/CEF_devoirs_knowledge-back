"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('lesson', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            cursus_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'cursus',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            order: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdBy: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'user',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            updatedBy: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true,
                defaultValue: null,
                references: {
                    model: 'user',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('lesson');
    }
}