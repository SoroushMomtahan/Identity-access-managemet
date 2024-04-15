import * as process from "process";

export default ()=>({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 1433,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});