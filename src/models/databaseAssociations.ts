import { User } from "./User.js";

// Relations between models

export function setupAssociations() {
    User.belongsTo(User, {
        as: 'UpdatedByUser',
        foreignKey: 'updatedBy',
    });

    User.hasMany(User, {
        as: 'UpdatedUsers',
        foreignKey: 'updatedBy',
    })
}

export { User };
