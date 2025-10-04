import { DataTypes, Model, Optional } from "sequelize";
import { User } from "./User.js";
import { sequelize } from "../config/database.js";
import { Element } from "./Element.js";

interface TextAttributes {
  id: number;
  element_id: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: User | null;
  updatedBy: User | null;

  IncludedInElement?: Element;
  UpdatedByUser?: User;
}

interface TextCreationAttributes extends Optional<TextAttributes, 'id' | 'createdAt' | 'updatedAt' | 'updatedBy' | 'IncludedInElement' | 'UpdatedByUser'> {}

export class Text extends Model<TextAttributes, TextCreationAttributes> implements TextAttributes {
  declare id: number;
  declare element_id: number;
  declare content: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare createdBy: User | null;
  declare updatedBy: User | null;

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
  content: {
    type: DataTypes.STRING(255),
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
}, {
  sequelize,
  tableName: 'text',
  timestamps: true,
  modelName: 'Text',
});