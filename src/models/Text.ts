import { DataTypes, Model, Optional } from "sequelize";
import { User } from "./User.js";
import { sequelize } from "../config/database.js";
import { Element } from "./Element.js";

export const TEXT_TYPES = ['title1', 'title2', 'title3', 'paragraph'] as const;
export type TextType = typeof TEXT_TYPES[number];

interface TextAttributes {
  id: number;
  element_id: number;
  type: TextType;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: number | null;
  updatedBy: number | null;

  IncludedInElement?: Element;
  UpdatedByUser?: User;
}

interface TextCreationAttributes extends Optional<TextAttributes, 'id' | 'createdAt' | 'updatedAt' | 'updatedBy' | 'IncludedInElement' | 'UpdatedByUser'> {}

export class Text extends Model<TextAttributes, TextCreationAttributes> implements TextAttributes {
  declare id: number;
  declare element_id: number;
  declare type: TextType;
  declare content: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare createdBy: number | null;
  declare updatedBy: number | null;

  declare IncludedInElement: Element;
  declare UpdatedByUser: User;
}

Text.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  element_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(...TEXT_TYPES),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 5000],
    }
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
}, {
  sequelize,
  tableName: 'text',
  timestamps: true,
  modelName: 'Text',
});