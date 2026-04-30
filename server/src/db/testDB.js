import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export async function testConnection() {
    const result = await pool.query('SELECT NOW()');
    return result.rows[0].now;
}