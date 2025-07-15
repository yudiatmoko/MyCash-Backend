import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function testConnection() {
  try {
    const client = await db.connect();
    console.log("Database connection success");
    client.release();
  } catch (error) {
    console.log("Database connection failed", error);
  }
}

async function query(command, values) {
  try {
    const { rows } = await db.query(command, values ?? []);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

export { testConnection, query };
