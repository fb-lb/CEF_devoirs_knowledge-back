import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

interface UserCursusAttributes {
  id: number,
  user_id: number,
  cursus_id: number,
  isValidated: boolean,
  createdAt?: Date,
  updatedAt?: Date,
  createdBy: number | null,
  updatedBy: number | null,
}

interface UserCursusCreationAttributes
  extends Optional<
    UserCursusAttributes,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "updatedBy"
  > {}

export class UserCursus
  extends Model<UserCursusAttributes, UserCursusCreationAttributes>
  implements UserCursusAttributes
{
  declare id: number;
  declare user_id: number;
  declare cursus_id: number;
  declare isValidated: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare createdBy: number | null;
  declare updatedBy: number | null;
}

UserCursus.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    cursus_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    isValidated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "user_cursus",
    timestamps: true,
    modelName: "UserCursus",
  }
)