import { Sequelize } from "sequelize";

const isProduction = process.env.NODE_ENV === 'production';

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    dialect: "mysql",
    //logging: console.log,
    dialectOptions: isProduction ?
    {
      ssl: {
        require: true,
        rejectUnauthorized: true,
      },
    } 
    : {},
    // logging: console.log,
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