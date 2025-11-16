import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../config/database.js';
import { User } from "./User.js";
import { Cursus } from "./Cursus.js";
import { UserTheme } from "./User-Theme.js";

interface ThemeAttributes {
  id: number;
  name: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: number | null;
  updatedBy: number | null;
  
  UpdatedByUser?: User | null;
  IncludesCursus?: Cursus[];
  ThemePurchases?: UserTheme[];
}

interface ThemeCreationAttributes extends Optional<ThemeAttributes, "id" | "createdAt" | "updatedAt" | "updatedBy" | "UpdatedByUser" | "IncludesCursus" | "ThemePurchases"> {}

export class Theme extends Model<ThemeAttributes, ThemeCreationAttributes> implements ThemeAttributes {
  declare id: number;
  declare name: string;
  declare order: number;
  
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare createdBy: number | null;
  declare updatedBy: number | null;

  declare UpdatedByUser: User | null;
  declare IncludesCursus: Cursus[];
  declare ThemePurchases: UserTheme[];
}

Theme.init(
{
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  updatedBy: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    defaultValue: null,
  }
},
{
  sequelize,
  tableName: 'theme',
  timestamps: true,
  modelName: 'Theme',
});