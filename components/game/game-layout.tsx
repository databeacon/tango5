'use client';

import { PropsWithoutRef, useState } from 'react';
import { ScenarioSelect } from '~/lib/types';
import { GameInitialCountdown } from '~/components/game/game-initial-countdown';
import { Game } from '~/components/game/game';
import { GameMenu } from '~/components/game/game-menu';

type GameLayoutProps = {
    scenario: ScenarioSelect;
    revealSolution?: boolean;
    backstageAccess?: boolean;
    remainingScenarios?: number;
};

export const GameLayout = (props: PropsWithoutRef<GameLayoutProps>) => {
    const [countdownRunning, setCountdownRunning] = useState(!props.revealSolution);
    const [openMenu, setOpenMenu] = useState(false);
    const [gameCurrentStatus, setGameCurrentStatus] = useState({
        timeRemaining: 0,
        cdpsFounded: 0,
        cpdsTotal: props.scenario.data.pcds.length
    });

    const handleOpenMenu = (timeRemaining: number, cdpsFounded: number) => {
        setGameCurrentStatus({ timeRemaining, cdpsFounded, cpdsTotal: props.scenario.data.pcds.length });
        setOpenMenu(true);
    };

    if (!props.revealSolution) {
        return (
            <GameInitialCountdown running={countdownRunning} onComplete={() => setCountdownRunning(false)}>
                <GameMenu
                    open={openMenu}
                    handleCloseMenu={() => setOpenMenu(false)}
                    gameCurrentStatus={gameCurrentStatus}
                    backstageAccess={props.backstageAccess}>
                    <Game pauseGame={countdownRunning || openMenu} handleOpenMenu={handleOpenMenu} {...props} />
                </GameMenu>
            </GameInitialCountdown>
        );
    }

    return <Game pauseGame={countdownRunning} {...props} />;
};
