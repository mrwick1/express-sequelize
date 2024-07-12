import { Sequelize } from "sequelize";
import { logger } from "./logger";

const sequelize = new Sequelize(
  process.env.DB_NAME || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: (msg) => logger.debug(msg),
  }
);

export const connect = async () => {
  try {
    if (
      process.env.DB_NAME === undefined ||
      process.env.DB_USER === undefined ||
      process.env.DB_PASSWORD === undefined ||
      process.env.DB_HOST === undefined
    ) {
      throw new Error("Please provide all the required environment variables");
    }
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
