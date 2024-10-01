import { Sequelize } from "sequelize";

const database = process.env.DB_NAME || "";
const username = process.env.DB_USER || "";
const password = process.env.DB_PASSWORD || "";
const host = process.env.DB_HOST || "";
const dialect = (process.env.DB_USER as any) || "";
const port = (process.env.DB_PORT as any) || "";

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port,
  logging: (msg) => console.log("sql req", msg),
});

export default sequelize;
