import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";
import { Lesson } from "./Lesson.js";

interface UserLessonAttributes {
  id: number,
  user_id: number,
  lesson_id: number,
  isValidated: boolean,
  createdAt?: Date,
  updatedAt?: Date,
  createdBy: number | null,
  updatedBy: number | null,

  PurchasedByUser?: User;
  CreatedByUser?: User;
  UpdatedByUser?: User;
  RelatedToLesson?: Lesson;
}

interface UserLessonCreationAttributes
  extends Optional<
    UserLessonAttributes,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "updatedBy"
    | "PurchasedByUser"
    | "CreatedByUser"
    | "UpdatedByUser"
    | "RelatedToLesson"
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

  declare PurchasedByUser: User;
  declare CreatedByUser: User;
  declare UpdatedByUser: User;
  declare RelatedToLesson: Lesson;
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