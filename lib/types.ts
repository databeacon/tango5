import { InferSelectModel, InferInsertModel } from 'drizzle-orm/table';
import { ScenariosTable, UserGamesTable, UsersTable } from './db/schema';
import { Scenario } from './domain/scenario';

export type ScenarioSelect = InferSelectModel<typeof ScenariosTable>;
export type UserGameInsert = InferInsertModel<typeof UserGamesTable>;
export type UserGameSelect = InferSelectModel<typeof UserGamesTable>;
export type UserSelect = InferSelectModel<typeof UsersTable>;

export type UserGameInsertPayload = Pick<UserGameInsert, 'scenarioId' | 'playTime' | 'success'> & {
    isDemo: boolean;
    played: ScenarioSelect['id'][];
};

export type ScenarioUserGame = Omit<ScenarioSelect, 'data'> & { data: Scenario };
export type CompleteDemoPayload = {
    played: ScenarioSelect['id'][];
};
