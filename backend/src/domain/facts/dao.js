import db from "../../db/index.js";

export const FetchDAO = async () => {
    const [result] = await db.execute(
        `
        SELECT code, name, description, question_text, is_active, created_at
        FROM fact_definitions
        WHERE deleted_at IS NULL
        ORDER BY created_at DESC
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

    const prefix = `FACT-${year}${month}${day}-`;
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
            FROM fact_definitions
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
            INSERT INTO fact_definitions
            (code, name, description, question_text, is_active)
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                code,
                data.name,
                data.description ?? null,
                data.question,
                true
            ]
        );

        await connection.commit();
        transactionStarted = false;

        return {
            id: result.insertId,
            code,
            name: data.name,
            description: data.description ?? null,
            questionText: data.questionText,
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
    const description = data.description ?? null;
    const questionText = data.questionText;
    const isActive = data.isActive === "active" ? true : false;

    const [result] = await db.execute(
        `
        UPDATE fact_definitions
        SET 
            name = ?,
            description = ?,
            question_text = ?,
            is_active = ?,
            updated_at = NOW()
        WHERE code = ?
        AND deleted_at IS NULL
        `,
        [
            name,
            description,
            questionText,
            isActive,
            code
        ]
    );

    return result.affectedRows > 0;
}

export const DeleteDAO = async (code) => {
    const [result] = await db.execute(
        `
        UPDATE fact_definitions
        SET deleted_at = NOW()
        WHERE code = ?
        AND deleted_at IS NULL
        `,
        [code]
    );

    return result.affectedRows > 0;
}