import { PropsWithChildren } from 'react';
import { GamePerformanceStat } from './game-performance';

type GameMenuProps = {
    backstageAccess?: boolean;
    open?: boolean;
    gameCurrentStatus: { timeRemaining: number; cdpsFounded: number; cpdsTotal: number };
    handleCloseMenu: () => void;
};
export const GameMenu = (props: PropsWithChildren<GameMenuProps>) => {
    return (
        <>
            {props.open && (
                <div className="absolute z-50 h-svh w-full">
                    <div className={'blur-md'}>{props.children}</div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-translucent">
                        {!props.backstageAccess && (
                            <section className="flex items-center justify-center gap-x-10">
                                <GamePerformanceStat
                                    stat={`${props.gameCurrentStatus.cdpsFounded}/${props.gameCurrentStatus.cpdsTotal}`}
                                    description="CPDs remaining"
                                />
                                <GamePerformanceStat
                                    stat={`${props.gameCurrentStatus.timeRemaining}`}
                                    description="seconds remaining"
                                />
                            </section>
                        )}
                        <ul>
                            <li onClick={props.handleCloseMenu}>Resume</li>
                            <li>option 1</li>
                            <li>option 1</li>
                            <li>option 1</li>
                        </ul>
                    </div>
                </div>
            )}
            {props.children}
        </>
    );
};
