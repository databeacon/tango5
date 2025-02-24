import { ScenarioSelect } from '~/lib/types';
import revalidateCacheTag from './cache';

export * from './scenarios';
export * from './usergames';

export type ActionState = { message: string; error: boolean };
export type ActionScenarioState =
    | { scenario: ScenarioSelect; pendingScenarios: number; played: ScenarioSelect['id'][]; error: false }
    | { scenario: undefined; pendingScenarios: 0; played: []; error: false }
    | { error: true; errorMessage: string; played: [] };

export default revalidateCacheTag;
