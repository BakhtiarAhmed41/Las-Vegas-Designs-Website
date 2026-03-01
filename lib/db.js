import mysql from "mysql2/promise";

function getPoolConfig() {
  const url = process.env.DATABASE_URL;
  if (url && url.startsWith("mysql")) {
    try {
      const parsed = new URL(url);
      return {
        host: parsed.hostname,
        port: parsed.port || 3306,
        user: parsed.username,
        password: parsed.password,
        database: parsed.pathname?.replace(/^\//, "") || "",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      };
    } catch (_) {
      // fallback to empty and let env vars or error handle
    }
  }
  return {
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT || "3306", 10),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "lasvegasdesigns",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
}

const pool = mysql.createPool(getPoolConfig());

export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export async function getConnection() {
  return pool.getConnection();
}

export default pool;
