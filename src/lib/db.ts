import mysql from 'mysql2/promise';

// Define a type for the global object to hold our pool in development
declare global {
  // eslint-disable-next-line no-var
  var dbPool: mysql.Pool | undefined;
}

let pool: mysql.Pool;

if (process.env.NODE_ENV === 'production') {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'rowshanara_edu',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
} else {
  // Prevent hot-reloading from creating multiple connection pools in development
  if (!global.dbPool) {
    global.dbPool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'rowshanara_edu',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  pool = global.dbPool;
}

export default pool;

/**
 * Helper to run query with typed results
 */
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const [results] = await pool.execute(sql, params);
  return results as T;
}
