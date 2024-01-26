import env from "dotenv";
import { Sequelize } from "sequelize";

env.config();

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
)

// const db = new Sequelize(process.env.DB_URI)

export default db