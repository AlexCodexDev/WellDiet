import db from "../../db/index.js";
import { goals } from "../../db/schema.js";

export const FetchDAO = async () => {
    const [result] = await db.execute(
        `
        SELECT
            gol.code,
            gol.name,
            dc.id AS category_id,
            dc.name AS category_name,
            gol.is_active,
            gol.created_at
        FROM goals AS gol
        INNER JOIN diet_categories AS dc ON gol.diet_category_id = dc.id
        WHERE gol.deleted_at IS NULL
        ORDER BY gol.created_at DESC
        `
    );

    return result;
}

export const CreateDAO = async (data) => {
    const parts = new Intl.DateTimeFormat("en", {
        timeZone: "Asia/Jakarta",
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(new Date());

    const year = parts.find(p => p.type === "year").value;
    const month = parts.find(p => p.type === "month").value;
    const day = parts.find(p => p.type === "day").value;

    const prefix = `GOAL-${year}${month}${day}-`;
    const lockName = `welldiet:${prefix}`;

    const connection = await db.getConnection();

    let lockAcquired = false;
    let transactionStarted = false;

    try {
        const [lockRows] = await connection.execute(
            `SELECT GET_LOCK(?, 10) AS acquired`,
            [lockName]
        );

        if(Number(lockRows[0].acquired) !== 1) {
            throw new Error("Failed to get lock fact code.");
        }

        lockAcquired = true;

        await connection.beginTransaction();
        transactionStarted = true;

        const [existing] = await connection.execute(
            `
            SELECT code
            FROM goals
            WHERE code LIKE ?
            `,
            [`${prefix}%`]
        );

        const lastSequence = existing.reduce((max, item) => {
            const sequence = Number(item.code.split("-").at(-1));

            return Number.isInteger(sequence)
                ? Math.max(max, sequence)
                : max;
        }, 0);

        const code = `${prefix}${String(lastSequence + 1).padStart(3, 0)}`;

        const [result] = await connection.execute(
            `
            INSERT INTO goals
            (code, diet_category_id, name, is_active)
            VALUES (?, ?, ?, ?)
            `,
            [
                code,
                data.category,
                data.name,
                true
            ]
        );

        await connection.commit();
        transactionStarted = false;

        return {
            id: result.insertId,
            code,
            category: data.diet_category_id,
            name: data.name,
            isActive: true
        }
    } catch (error) {
        if(transactionStarted) {
            await connection.rollback();
        }

        throw new Error(error.message);
    } finally {
        if(lockAcquired) {
            try {
                await connection.execute(
                    `SELECT RELEASE_LOCK(?)`,
                    [lockName]
                );
            } catch (error) {
                throw new Error(error.message);
            }
        }

        connection.release();
    }
}

export const UpdateDAO = async (code, data) => {
    const name = data.name;
    const category = data.category;
    const status = data.isActive === "active" ? true : false;

    const [result] = await db.execute(
        `
        UPDATE goals
        SET
            diet_category_id = ?,
            name = ?,
            is_active = ?,
            updated_at = NOW()
        WHERE code = ?
        AND deleted_at IS NULL
        `,
        [
            category,
            name,
            status,
            code
        ]
    );

    return result.affectedRows > 0;
}

export const DeleteDAO = async (code) => {
    const [result] = await db.execute(
        `
        UPDATE goals
        SET deleted_at = NOW()
        WHERE code = ?
        AND deleted_at IS NULL
        `,
        [code]
    );

    return result.affectedRows > 0;
}