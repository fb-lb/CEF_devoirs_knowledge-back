import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";
import { Cursus } from "./Cursus.js";
import { User } from "./User.js";
import { Element } from "./Element.js";

interface LessonAttributes {
  id: number;
  cursus_id: number;
  name: string;
  price: number;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: number | null;
  updatedBy: number | null;

  IncludedInCursus?: Cursus;
  UpdatedByUser?: User | null;
  InludesElements?: Element[]
}

interface LessonCreationAttributes extends Optional<LessonAttributes, "id" | "createdAt" | "updatedAt" | "updatedBy" | "IncludedInCursus" | "UpdatedByUser" | "InludesElements"> {}

export class Lesson extends Model<LessonAttributes, LessonCreationAttributes> implements LessonAttributes {
  declare id: number;
  declare cursus_id: number;
  declare name: string;
  declare price: number;
  declare order: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare createdBy: number | null;
  declare updatedBy: number | null;

  declare IncludedInCursus: Cursus;
  declare UpdatedByUser: User | null;
  declare InludesElements: Element[];
}

Lesson.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  cursus_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
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
  },
},
{
  sequelize,
  tableName: 'lesson',
  timestamps: true,
  modelName: 'Lesson',
});