import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const connectionString = process.env.DATABASE_URL;

if(!connectionString) {
    throw new Error("DATABASE belum dikonfigurasi");
}

const url = new URL(connectionString);

const db = mysql.createPool({
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: decodeURIComponent(url.pathname.slice(1)),

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    supportBigNumbers: true,
    bigNumberStrings: true
});

export default db;

// export const pool = mysql.createPool(connectionString);

// export const db = drizzle({
//     client: pool,
//     schema
// });