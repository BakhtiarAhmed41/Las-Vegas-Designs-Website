import pg from "pg";

const { Pool, types } = pg;

types.setTypeParser(1700, (val) => parseFloat(val));

let pool;

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL is not set. Add it to .env.local (PostgreSQL connection string)."
      );
    }
    pool = new Pool({
      connectionString,
      max: 3,
      connectionTimeoutMillis: 10000,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

function convertPlaceholders(sql) {
  let idx = 0;
  return sql.replace(/\?/g, () => `$${++idx}`);
}

export async function query(sql, params = []) {
  const pgSql = convertPlaceholders(sql);
  const result = await getPool().query(pgSql, params);
  return result.rows;
}

export async function getConnection() {
  return getPool().connect();
}

export default { query, getConnection };
