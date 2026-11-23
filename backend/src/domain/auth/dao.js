import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema.js"

export const FindUserByEmail = async (email) => {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    return user;
}

export const FindUserById = async (id) => {
    const [user] = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email
        })
        .from(users)
        .where(eq(users.id, id))
        limit(1);

    return user;
}

export const Register = async (data) => {
    const result = await db
        .insert(users)
        .values(data)
        .$returningId();

    return result[0];
}