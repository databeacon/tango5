import { PropsWithChildren } from 'react';
import { GamePerformanceStat } from './game-performance';
import Link from 'next/link';

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
                <div className="absolute z-30 h-svh w-full">
                    <div className={'blur-md'}>{props.children}</div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 bg-translucent">
                        <div className="font-map font-barlow text-7xl font-light">Game paused</div>
                        {!props.backstageAccess && (
                            <section className="flex items-center justify-center gap-x-10">
                                <GamePerformanceStat
                                    stat={`${props.gameCurrentStatus.cdpsFounded}/${props.gameCurrentStatus.cpdsTotal}`}
                                    description="CPDs founded"
                                />
                                <GamePerformanceStat
                                    stat={`${props.gameCurrentStatus.timeRemaining}`}
                                    description="seconds remaining"
                                />
                            </section>
                        )}
                        <ul className="w-96 space-y-3 rounded-3xl bg-map p-5 text-center font-barlow text-2xl font-light">
                            <li className="w-full border-b border-white py-3">
                                <button className="hover:text-background" onClick={props.handleCloseMenu}>
                                    Resume
                                </button>
                            </li>
                            <li className="w-full border-b border-white pb-3">
                                <Link className="hover:text-background" href="/app/scores">
                                    Scores
                                </Link>
                            </li>
                            <li className="w-full border-b border-white pb-3">
                                <Link className="hover:text-background" href="/app/tutorial">
                                    Help
                                </Link>
                            </li>
                            {props.backstageAccess && (
                                <li className="w-full pb-3">
                                    <Link className="hover:text-background" href="/backstage">
                                        Backstage
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
            {props.children}
        </>
    );
};
