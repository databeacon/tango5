import { ScenarioParsed } from '../types';
import revalidateCacheTag from './cache';

export * from './scenarios';
export * from './usergames';

export type ActionState = { message: string; error: boolean };
export type ActionScenarioState =
    | { scenario: ScenarioParsed; pendingScenarios: number; error: false }
    | { scenario: undefined; pendingScenarios: 0; error: false }
    | { scenario: undefined; pendingScenarios?: number; error: true; errorMessage: string };

export default revalidateCacheTag;
