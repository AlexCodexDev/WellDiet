import { eq, isNull, like } from "drizzle-orm";
import { db } from "../../db/index.js";
import { diet_categories } from "../../db/schema.js";

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
    return await db
        .select({
            code: diet_categories.code,
            name: diet_categories.name,
            description: diet_categories.description,
            isActive: diet_categories.isActive
        })
        .from(diet_categories)
        .where(isNull(diet_categories.deletedAt));
}

export const CreateDAO = async (data) => {
    return await db.transaction(async (tx) => {
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

        const existing = await tx
            .select({
                code: diet_categories.code
            })
            .from(diet_categories)
            .where(like(diet_categories.code, `${prefix}%`));

        const lastSequence = existing.reduce((max, item) => {
            const sequence = Number(item.code.split("-").at(-1));

            return Number.isInteger(sequence)
                ? Math.max(max, sequence)
                : max;
        }, 0);

        const code = await GenerateCategoryCode(lastSequence + 1);

        const [inserted] = await tx
            .insert(diet_categories)
            .values({
                code: "pending",
                name: data.name,
                description: data.description,
                isActive: true
            })
            .$returningId();

        const id = inserted.id;

        await tx
            .update(diet_categories)
            .set({ code: code })
            .where(eq(diet_categories.id, id));

        return {
            code,
            name: data.name,
            description: data.description ?? null,
            isActive: data.isActive ?? true
        }
    });
}

export const UpdateDAO = async (code, data) => {
    return await  db.transaction(async (tx) => {
        await tx
            .update(diet_categories)
            .set({
                name: data.name,
                description: data.description
            })
            .where(eq(diet_categories.code, code));
    });
}

export const DeleteDAO = async (code) => {
    return await db.transaction(async (tx) => {
        const categoryID = await tx
            .select({
                id: diet_categories.id
            })
            .from(diet_categories)
            .where(eq(diet_categories.code, code))
            .limit(1);

        await tx
            .update(diet_categories)
            .set({
                deletedAt: new Date()
            })
            .where(eq(diet_categories.id, categoryID[0].id));
    });
}