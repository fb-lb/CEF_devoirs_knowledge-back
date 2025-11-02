import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

interface UserThemeAttributes {
  id: number,
  user_id: number,
  theme_id: number,
  isCertified: boolean,
  createdAt?: Date,
  updatedAt?: Date,
  createdBy: number | null,
  updatedBy: number | null,
}

interface UserThemeCreationAttributes
  extends Optional<
    UserThemeAttributes,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "updatedBy"
  > {}

export class UserTheme
  extends Model<UserThemeAttributes, UserThemeCreationAttributes>
  implements UserThemeAttributes
{
  declare id: number;
  declare user_id: number;
  declare theme_id: number;
  declare isCertified: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare createdBy: number | null;
  declare updatedBy: number | null;
}

UserTheme.init(
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
    theme_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    isCertified: {
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
    tableName: "user_theme",
    timestamps: true,
    modelName: "UserTheme",
  }
)