import db from "../../db/index.js";

export const FindUserByEmail = async (email) => {
    const [user] = await db.execute(
        `
        SELECT id, username, email, password, role
        FROM users
        WHERE email = ?
        AND deleted_at IS NULL
        LIMIT 1
        `,
        [email]
    );

    // const [user] = await db
    //     .select()
    //     .from(users)
    //     .where(eq(users.email, email))
    //     .limit(1);

    return user[0] ?? null;
}

export const FindUserById = async (id) => {
    const [user] = await db.execute(
        `
        SELECT id, username, email, role
        FROM users
        WHERE id = ?
        AND deleted_at IS NULL
        LIMIT 1
        `,
        [id]
    );

    // const [user] = await db
    //     .select({
    //         id: users.id,
    //         username: users.username,
    //         email: users.email
    //     })
    //     .from(users)
    //     .where(eq(users.id, id))
    //     limit(1);

    return user[0] ?? null;
}

export const Register = async (data) => {
    const { username, email, password } = data;

    const [result] = await db.execute(
        `
        INSERT INTO users
        (username, email, password)
        VALUES
        (?, ?, ?)
        `,
        [username, email, password]
    );

    // const result = await db
    //     .insert(users)
    //     .values(data)
    //     .$returningId();

    return {
        id: result.insertId
    };
}