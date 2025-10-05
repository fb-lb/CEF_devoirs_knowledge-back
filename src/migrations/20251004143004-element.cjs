"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('element', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            lesson_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'lesson',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            type: {
                type: Sequelize.ENUM('text', 'image'),
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
        await queryInterface.dropTable('element');
    }
}