import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";

interface UserLessonAttributes {
  id: number,
  user_id: number,
  lesson_id: number,
  isValidated: boolean,
  createdAt?: Date,
  updatedAt?: Date,
  createdBy: number | null,
  updatedBy: number | null,
}

interface UserLessonCreationAttributes
  extends Optional<
    UserLessonAttributes,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "updatedBy"
  > {}

export class UserLesson
  extends Model<UserLessonAttributes, UserLessonCreationAttributes>
  implements UserLessonAttributes
{
  declare id: number;
  declare user_id: number;
  declare lesson_id: number;
  declare isValidated: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare createdBy: number | null;
  declare updatedBy: number | null;
}

UserLesson.init(
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
    lesson_id: {
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
    tableName: "user_lesson",
    timestamps: true,
    modelName: "UserLesson",
  }
)