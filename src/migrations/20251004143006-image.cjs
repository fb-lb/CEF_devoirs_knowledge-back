'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('image', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            element_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'element',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            source: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            alternative: {
                type: Sequelize.STRING(255),
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
        await queryInterface.dropTable('image');
    },
}