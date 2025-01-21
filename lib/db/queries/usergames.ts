import { count, eq } from 'drizzle-orm';
import { db } from '~/lib/db';
import { UserGameInsert, UserGamesTable } from '~/lib/db/schema';
import { TableObject } from '.';

export const writeUserGame = async (userGame: UserGameInsert) => {
    return await db.insert(UserGamesTable).values(userGame).onConflictDoNothing().returning();
};

export const getUserGames = async (userId?: string) => {
    const query = db.select().from(UserGamesTable);

    if (userId) {
        query.where(eq(UserGamesTable.userId, userId));
    }

    return await query.execute();
};

export const deleteUserGame = async (id: number) => {
    return await db.delete(UserGamesTable).where(eq(UserGamesTable.id, id)).returning();
};

export const deleteUserGames = async (userId: string) => {
    return await db.delete(UserGamesTable).where(eq(UserGamesTable.userId, userId)).returning();
};

export const getUserGamesPage = async (pageIndex: number, pageSize: number): Promise<TableObject> => {
    try {
        const total = await db.select({ value: count() }).from(UserGamesTable);
        const values = await db.select().from(UserGamesTable).limit(pageSize).offset(pageIndex);
        return {
            count: total[0]?.value,
            values
        };
    } catch {
        return { count: 0, values: [] };
    }
};
