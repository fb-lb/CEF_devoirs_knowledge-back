import { DataTypes, Model, Optional } from "sequelize";
import { User } from "./User.js";
import { sequelize } from "../config/database.js";
import { Element } from "./Element.js";

interface ImageAttributes {
  id: number;
  element_id: number;
  source: string;
  alternative: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: User | null;
  updatedBy: User | null;

  IncludedInElement?: Element;
  UpdatedByUser?: User | null;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, 'id' | 'createdAt' | 'updatedAt' | 'updatedBy' | 'IncludedInElement' | 'UpdatedByUser'> {}

export class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
  declare id: number;
  declare element_id: number;
  declare source: string;
  declare alternative: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare createdBy: User | null;
  declare updatedBy: User | null;

  declare IncludedInElement: Element;
  declare UpdatedByUser: User | null;
}

Image.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  element_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  source: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  alternative: {
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
  tableName: 'image',
  timestamps: true,
  modelName: 'Image',
});