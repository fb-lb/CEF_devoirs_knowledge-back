import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";
import { Theme } from "./Theme.js";
import { User } from "./User.js";
import { Lesson } from "./Lessons.js";

interface CursusAttributes {
  id: number;
  theme_id: number;
  name: string;
  price: number;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: number | null;
  updatedBy: number | null;
  
  IncludedInTheme?: Theme;
  UpdatedByUser?: User | null;
  InludesLessons?: Lesson[];
}

interface CursusCreationAttributes extends Optional<CursusAttributes, "id" | "createdAt" | "updatedAt" | "updatedBy" | "IncludedInTheme" | "UpdatedByUser" | "InludesLessons"> {}

export class Cursus extends Model<CursusAttributes, CursusCreationAttributes> implements CursusAttributes {
  declare id: number;
  declare theme_id: number;
  declare name: string;
  declare price: number;
  declare order: number;
  
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare createdBy: number | null;
  declare updatedBy: number | null;

  declare IncludedInTheme: Theme;
  declare UpdatedByUser: User | null;
  declare InludesLessons: Lesson[]
}

Cursus.init(
{
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  theme_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  }
},
{
  sequelize,
  tableName: 'cursus',
  timestamps: true,
  modelName: 'Cursus',
})