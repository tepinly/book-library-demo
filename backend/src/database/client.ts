import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize({
	dialect: "postgres",
	host: process.env.POSTGRES_HOST,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
});
