import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { cn } from '~/lib/utils';

type GameMenuProps = {
    backstageAccess?: boolean;
    open?: boolean;
    onClose: () => void;
};
export const GameMenu = (props: PropsWithChildren<GameMenuProps>) => {
    return (
        <div className="relative">
            <div className={cn(props.open && 'blur-md')}>{props.children}</div>
            <div
                className={cn(
                    'absolute inset-0 flex h-svh w-full flex-col items-center justify-center gap-10 bg-translucent',
                    props.open ? 'flex' : 'hidden'
                )}>
                <div className="font-map font-barlow text-7xl font-light">Game paused</div>
                <ul className="w-96 space-y-3 rounded-3xl bg-map p-5 text-center font-barlow text-2xl font-light">
                    <li className="w-full border-b border-white py-3">
                        <button className="hover:text-background" onClick={props.onClose}>
                            Resume
                        </button>
                    </li>
                    <li className="w-full border-b border-white pb-3">
                        <Link className="hover:text-background" href="/app/scores">
                            Scores
                        </Link>
                    </li>
                    <li className="w-full border-b border-white pb-3 last:border-none">
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
    );
};
