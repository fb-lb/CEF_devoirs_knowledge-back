import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    //logging: console.log,
  }
);

// Connection test
export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Connected to the database.");
    } catch (error) {
        console.error("Connection to the database failed : ", error);
    }
}