'use client';

import { PropsWithoutRef, useState } from 'react';
import { ScenarioSelect } from '~/lib/types';
import { GameInitialCountdown } from '~/components/game/game-initial-countdown';
import { GameMenu } from '~/components/game/game-menu';
import { UserGame } from '~/components/usergame/usergame';

type GameSceneProps = {
    scenario: ScenarioSelect;
    revealSolution?: boolean;
    backstageAccess?: boolean;
    remainingScenarios?: number;
    demoMode?: boolean;
};

export const GameScene = (props: PropsWithoutRef<GameSceneProps>) => {
    const [countdownRunning, setCountdownRunning] = useState(!props.revealSolution);
    const [openMenu, setOpenMenu] = useState(false);
    const [gameCurrentStatus] = useState({
        timeRemaining: 0,
        cdpsFounded: 0,
        cpdsTotal: props.scenario.data.pcds.length
    });

    const handleOpenMenu = () => {
        //setGameCurrentStatus({ timeRemaining, cdpsFounded, cpdsTotal: props.scenario.data.pcds.length });
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
                    <UserGame
                        countdownRunning={countdownRunning || openMenu}
                        handleOpenMenu={handleOpenMenu}
                        {...props}
                    />
                </GameMenu>
            </GameInitialCountdown>
        );
    }

    return <UserGame countdownRunning={countdownRunning} {...props} />;
};
