'use client';
import { PropsWithoutRef, startTransition, useActionState, useCallback, useRef, useState } from 'react';
import { ScenarioSelect, ScenarioUserGame } from '~/lib/types';
import { GameNextButton } from '~/components/game/game-next-button';
import { Game, ResetGameHandle } from '../game/game';
import { useRouter } from 'next/navigation';
import { completeUserGame } from '~/lib/actions';
import posthog from 'posthog-js';
import { Scenario } from '~/lib/domain/scenario';
import { toast } from 'sonner';
import Image from 'next/image';
import { IconButton } from '~/components/ui/icon-button';
import { GAME_MAX_SCENARIOS_IN_A_ROW, posthogEvents } from '~/lib/constants';

export type UserGameProps = {
    scenario: ScenarioSelect;
    remainingScenarios?: number;
    backstageAccess?: boolean;
    countdownRunning?: boolean;
    revealSolution?: boolean;
    demoMode?: boolean;
};

const UserGame = (props: PropsWithoutRef<UserGameProps>) => {
    const isDemo = props.demoMode;
    const gameRef = useRef<ResetGameHandle>(null);
    const { replace } = useRouter();

    const [scenario, setScenario] = useState<ScenarioUserGame>({
        ...props.scenario,
        data: new Scenario(props.scenario.data)
    });

    const [remainingScenarios, setRemainingScenarios] = useState(
        props.remainingScenarios !== undefined ? props.remainingScenarios - 1 : undefined
    );
    const [scenariosInARow, setScenariosInARow] = useState(1);
    const [enableNext, setEnableNext] = useState(false);

    const [nextScenarioState, completeGameAction, completionPending] = useActionState(completeUserGame, {
        scenario: props.scenario,
        pendingScenarios: props.remainingScenarios ?? 0,
        played: [props.scenario.id],
        error: false
    });

    const handleGameStart = useCallback(() => {
        if (props.backstageAccess) return;

        posthog.capture(isDemo ? posthogEvents.demoStart : posthogEvents.gameStart, {
            scenarioId: scenario.id
        });
    }, [scenario.id, props.backstageAccess, isDemo]);

    const handleGameFinish = useCallback(
        (success: boolean, playTime: string | null) => {
            if (props.backstageAccess) return;

            startTransition(async () => {
                completeGameAction({
                    scenarioId: scenario.id,
                    playTime: playTime,
                    success: success,
                    played: [...nextScenarioState.played, scenario.id],
                    isDemo: isDemo || false
                });
            });
            posthog.capture(!isDemo ? posthogEvents.gameFinish : posthogEvents.demoFinish, {
                scenarioId: scenario.id,
                success
            });

            setEnableNext(true);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [scenario.id, props.backstageAccess, completeGameAction, isDemo]
    );

    const handleNextScenario = () => {
        if (!isDemo) {
            if (nextScenarioState.error) {
                toast.error('Something went wrong, could not load next scenario');
                replace('/app/scores');
                return;
            }

            const { scenario: nextScenario, pendingScenarios } = nextScenarioState;

            // There are no more scenarios to play, redirect to games page
            if (!nextScenario && pendingScenarios === 0) {
                replace('/app/scores');
                return;
            }
            // When user plays N scenarios in a row, redirect to scores. Otherwise increment the counter
            if (scenariosInARow >= GAME_MAX_SCENARIOS_IN_A_ROW) {
                replace('/app/scores');
                return;
            }

            setScenariosInARow((prev) => prev + 1);
            setRemainingScenarios(pendingScenarios - 1);
            setEnableNext(false);

            if (gameRef.current) gameRef.current.resetGame();

            setScenario({
                ...nextScenario,
                data: new Scenario(nextScenario.data)
            });
        }

        if (isDemo) {
            if (nextScenarioState.error) {
                toast.error('Something went wrong, could not load next demo scenario');
                replace('/login');
                return;
            }

            const { scenario: nextScenario, pendingScenarios } = nextScenarioState;

            // There are no more scenarios to play, redirect to games page
            if (!nextScenario || pendingScenarios <= 0) {
                replace('/login');
                return;
            }

            setEnableNext(false);
            setRemainingScenarios(pendingScenarios - 1);
            if (gameRef.current) gameRef.current.resetGame();

            setScenario({
                ...nextScenario,
                data: new Scenario(nextScenario.data)
            });
        }
    };

    return (
        <>
            {!props.revealSolution && (
                <>
                    <div className="fixed bottom-1 right-72 z-10 mt-10 text-xs text-white/15">{scenario.id}</div>
                    <IconButton href={'/app/tutorial'} hoverText={'Help'}>
                        <div className="border-carousel-dots button-shadow fixed right-[180px] top-6 z-10 flex w-[38px] cursor-pointer items-center justify-center rounded-full border bg-map font-barlow text-3xl text-secondary hover:bg-sidebar-foreground">
                            ?
                        </div>
                    </IconButton>
                    <IconButton
                        href={props.backstageAccess ? '/backstage/scenarios' : '/app/scores'}
                        hoverText={'Options'}>
                        <Image
                            src="/images/gear.svg"
                            width={27}
                            height={27}
                            alt="Options"
                            className="border-carousel-dots button-shadow fixed right-[108px] top-6 z-10 h-[38px] w-[38px] cursor-pointer rounded-full border bg-map p-1 hover:bg-sidebar-foreground"
                        />
                    </IconButton>
                </>
            )}
            {!props.backstageAccess && !props.revealSolution && (
                <>
                    {!isDemo && (
                        <div className="fixed right-60 top-7 z-10 mt-[3px] select-none font-barlow font-light text-map">
                            Remaining scenarios: {remainingScenarios}
                        </div>
                    )}
                    <GameNextButton
                        className="fixed bottom-12 right-24 z-10 px-8"
                        disabled={!enableNext}
                        loading={completionPending}
                        loadingText={'Saving...'}
                        onClick={handleNextScenario}>
                        {scenariosInARow >= GAME_MAX_SCENARIOS_IN_A_ROW ? 'Finish' : 'Next'}
                    </GameNextButton>
                </>
            )}
            <Game
                ref={gameRef}
                scenario={scenario}
                revealSolution={props.revealSolution}
                startGame={handleGameStart}
                endGame={handleGameFinish}
            />
        </>
    );
};

export { UserGame };
