import { DataTypes, Model, Optional } from "sequelize";
import { User } from "./User.js";
import { sequelize } from "../config/database.js";
import { Lesson } from "./Lesson.js";
import { Text } from "./Text.js";
import { Image } from "./Image.js";

interface ElementAttributes {
  id: number;
  lesson_id: number;
  type: "text" | "image";
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: number | null;
  updatedBy: number | null;

  IncludedInLesson?: Lesson;
  UpdatedByUser?: User | null;
  IncludeText?: Text;
  IncludeImage?: Image;
}

interface ElementCreationAttributes
  extends Optional<
    ElementAttributes,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "updatedBy"
    | "IncludedInLesson"
    | "UpdatedByUser"
    | "IncludeText"
    | "IncludeImage"
  > {}

export class Element
  extends Model<ElementAttributes, ElementCreationAttributes>
  implements ElementAttributes
{
  declare id: number;
  declare lesson_id: number;
  declare type: "text" | "image";
  declare order: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare createdBy: number | null;
  declare updatedBy: number | null;

  declare IncludedInLesson: Lesson;
  declare UpdatedByUser: User | null;
  declare IncludeText: Text;
  declare IncludeImage: Image;
}

Element.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    lesson_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("text", "image"),
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
    tableName: "element",
    timestamps: true,
    modelName: "Element",
  }
);
