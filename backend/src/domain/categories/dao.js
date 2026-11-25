import db from "../../db/index.js";

async function GenerateCategoryCode(sequence) {
    const parts = new Intl.DateTimeFormat("en", {
        timeZone: "Asia/Jakarta",
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(new Date());

    const year = parts.find(p => p.type === "year").value;
    const month = parts.find(p => p.type === "month").value;
    const day = parts.find(p => p.type === "day").value;

    const dateCode = `${year}${month}${day}`;

    return `CAT-${dateCode}-${String(sequence).padStart(3, "0")}`;
}

export const FetchDAO = async () => {
    const [data] = await db.execute(
        `
        SELECT code, name, description, is_active
        FROM diet_categories
        WHERE deleted_at IS NULL
        `
    );

    return data;
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

    const prefix = `CAT-${year}${month}${day}-`;
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
            throw new Error("Failed to get lock category code.");
        }

        lockAcquired = true;

        await connection.beginTransaction();
        transactionStarted = true;

        const [existing] = await connection.execute(
            `
            SELECT code
            FROM diet_categories
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
            INSERT INTO diet_categories
            (code, name, description, is_active)
            VALUES (?, ?, ?, ?)
            `,
            [
                code,
                data.name,
                data.description ?? null,
                data.isActive ?? true
            ]
        );

        await connection.commit();
        transactionStarted = false;

        return {
            id: result.insertId,
            code,
            name: data.name,
            description: data.description ?? null,
            isActive: data.isActive ?? true
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
    const description = data.description ?? null;
    const status = data.status === 1 ? true : false;

    const [result] = await db.execute(
        `
        UPDATE diet_categories
        SET
            name = ?,
            description = ?,
            is_active = ?
        WHERE code = ?
        AND deleted_at IS NULL
        `,
        [
            name,
            description ?? null,
            status,
            code
        ]
    );

    return result.affectedRows > 0;
}

export const DeleteDAO = async (code) => {
    const [result] = await db.execute(
        `
        UPDATE diet_categories
        SET deleted_at = NOW()
        WHERE code = ?
        AND deleted_at IS NULL
        `,
        [code]
    );

    return result.affectedRows > 0;
}