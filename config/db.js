import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    enableKeepAlive: true,        // 🔥 prevents ECONNRESET
    keepAliveInitialDelay: 0,

    connectTimeout: 10000         // ⏱️ fail fast if DB not reachable
});

// 🔥 VERY IMPORTANT (logs hidden crashes)
pool.on("error", (err) => {
    console.error("MySQL Pool Error:", err);
});

export default pool;