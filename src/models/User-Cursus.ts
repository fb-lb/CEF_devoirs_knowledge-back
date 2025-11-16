import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";
import { Cursus } from "./Cursus.js";

interface UserCursusAttributes {
  id: number,
  user_id: number,
  cursus_id: number,
  isValidated: boolean,
  createdAt?: Date,
  updatedAt?: Date,
  createdBy: number | null,
  updatedBy: number | null,

  PurchasedByUser?: User;
  CreatedByUser?: User;
  UpdatedByUser?: User;
  RelatedToCursus?: Cursus;
}

interface UserCursusCreationAttributes
  extends Optional<
    UserCursusAttributes,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "updatedBy"
    | "PurchasedByUser"
    | "CreatedByUser"
    | "UpdatedByUser"
    | "RelatedToCursus"
  > {}

export class UserCursus
  extends Model<UserCursusAttributes, UserCursusCreationAttributes>
  implements UserCursusAttributes
{
  declare id: number;
  declare user_id: number;
  declare cursus_id: number;
  declare isValidated: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare createdBy: number | null;
  declare updatedBy: number | null;

  declare PurchasedByUser: User;
  declare CreatedByUser: User;
  declare UpdatedByUser: User;
  declare RelatedToCursus: Cursus;
}

UserCursus.init(
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
    cursus_id: {
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
    tableName: "user_cursus",
    timestamps: true,
    modelName: "UserCursus",
  }
)