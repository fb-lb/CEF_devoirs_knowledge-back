import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log,
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