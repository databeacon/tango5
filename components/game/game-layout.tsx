'use client';

import { PropsWithoutRef, useState } from 'react';
import { ScenarioSelect } from '~/lib/types';
import { GameInitialCountdown } from '~/components/game/game-initial-countdown';
import { UserGame } from '../usergame/usergame';

type GameLayoutProps = {
    scenario: ScenarioSelect;
    revealSolution?: boolean;
    backstageAccess?: boolean;
    remainingScenarios?: number;
    demoScenarios?: ScenarioSelect[];
};

export const GameLayout = (props: PropsWithoutRef<GameLayoutProps>) => {
    const [countdownRunning, setCountdownRunning] = useState(!props.revealSolution);

    if (!props.revealSolution) {
        return (
            <GameInitialCountdown running={countdownRunning} onComplete={() => setCountdownRunning(false)}>
                <UserGame countdownRunning={countdownRunning} {...props} />
            </GameInitialCountdown>
        );
    }

    return <UserGame countdownRunning={countdownRunning} {...props} />;
};
