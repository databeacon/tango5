'use server';

import { ActionState } from '.';
import { scenarioSchema } from '~/lib/domain/scenario';
import { updateScenarioReleaseDate, writeScenario } from '~/lib/db/queries';
import { deleteScenario as deleteDBScenario } from '~/lib/db/queries';
import { format } from 'date-fns';

export async function createScenario(
    _prevState: ActionState,
    payload: { data: string; fileName: string }
): Promise<ActionState> {
    let json;

    try {
        json = JSON.parse(payload.data);
    } catch {
        return { message: `${payload.fileName} is not a valid JSON document`, error: true };
    }

    const scenarioData = scenarioSchema.safeParse(json);

    if (scenarioData.error) {
        return { message: `${payload.fileName} does not have the correct JSON schema`, error: true };
    }

    const result = await writeScenario(scenarioData.data);

    if (result.length === 0) {
        return { message: `Internal database error when saving ${payload.fileName}`, error: true };
    }

    return { message: `Scenario #${result[0].id} created from ${payload.fileName}`, error: false };
}

export async function setScenarioReleaseDate(
    _prevState: ActionState,
    payload: { id: number; releaseDate: Date | undefined }
): Promise<ActionState> {
    const { id, releaseDate } = payload;
    const result = await updateScenarioReleaseDate(id, releaseDate);

    if (result.length === 0) {
        return { message: `Scenario #${id} not found`, error: true };
    }

    return {
        message: releaseDate
            ? `Set a new release date for scenario #${id} - ${format(releaseDate, 'PPP')}`
            : `Cleared release date for scenario #${id}`,
        error: false
    };
}

export async function deleteScenario(_prevState: ActionState, id: number): Promise<ActionState> {
    const result = await deleteDBScenario(id);

    if (result.length === 0) {
        return { message: `Scenario #${id} not found`, error: true };
    }

    return { message: `Scenario #${id} deleted`, error: false };
}
