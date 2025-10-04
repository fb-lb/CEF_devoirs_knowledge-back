import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../config/database.js';
import { Theme } from "./Theme.js";
import { Cursus } from "./Cursus.js";
import { Lesson } from "./Lessons.js";
import { Element } from "./Element.js";
import { Text } from "./Text.js";
import { Image } from "./Image.js";


interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: ("user" | "admin")[];
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy: number | null;
  
  UpdatedByUsers?: User | null;
  UpdatedUsers?: User[];
  UpdatedThemes?: Theme[];
  UpdatedCursus?: Cursus[];
  UpdatedLessons?: Lesson[];
  UpdatedElements?: Element[];
  UpdatedText?: Text[];
  UpdatedImages?: Image[];
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "roles" | "isVerified" | "createdAt" | "updatedAt" | "updatedBy" | "UpdatedByUsers" | "UpdatedUsers" | "UpdatedThemes" | "UpdatedCursus" | "UpdatedLessons" | "UpdatedElements" | "UpdatedText" | "UpdatedImages"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare roles: ("user" | "admin")[];
  declare isVerified: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare updatedBy: number | null;

  declare UpdatedByUsers: User | null;
  declare UpdatedUsers: User[];
  declare UpdatedThemes: Theme[];
  declare UpdatedCursus: Cursus[];
  declare UpdatedLessons: Lesson[];
  declare UpdatedElements: Element[];
  declare UpdatedText: Text[];
  declare UpdatedImages: Image[];
}

// If you modify one of these conditions, make sure that back end validators (in form.service.ts) and front end validators are also modified
User.init(
{
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  roles: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: ["user"],
    get(){
      const rawValue = this.getDataValue('roles');
      return typeof(rawValue) === 'string' ? JSON.parse(rawValue) : rawValue;
    },
    validate: {
      isValidRoleArray(value: string[]) {
        const allowed = ["user", "admin"];
        if (!Array.isArray(value) || !value.every(r => allowed.includes(r))) {
          throw new Error ("Invalid role in roles array");
        }
      }
    }
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  }
},
{
  sequelize,
  tableName: "users",
  timestamps: true,
  modelName: "User",
})