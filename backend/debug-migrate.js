
import "dotenv/config";

import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";

const connection = await mysql.createConnection(
    process.env.DATABASE_URL
);

const db = drizzle({
    client: connection
});

try {
    console.log("Memulai migration...");

    await migrate(db, {
        migrationsFolder: "./drizzle"
    });

    console.log("Migration berhasil!");

} catch (error) {
    console.error("\nMIGRATION FAILED:");
    console.error(error);

    if (error.cause) {
        console.error("\nDATABASE ERROR:");
        console.error(error.cause);
    }

    process.exitCode = 1;

} finally {
    await connection.end();
}
