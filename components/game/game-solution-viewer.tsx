'use client';

import { PropsWithoutRef, useEffect, useRef, useState } from 'react';
import { ScenarioSelect } from '~/lib/types';
import { PopupWindow } from '~/components/ui/popup-window';
import { GameLayout } from '~/components/game/game-layout';
import { LoadingSpinner } from '~/components/ui/loading-spinner';

type GameSolutionViewerProps = {
    open: boolean;
    onClose: () => void;
    scenario: ScenarioSelect | undefined;
};

const ANIMATION_DURATION = 300;

export const GameSolutionViewer = (props: PropsWithoutRef<GameSolutionViewerProps>) => {
    const popupRef = useRef<HTMLDialogElement>(null);
    const [loading, setLoading] = useState(true);

    const { open, onClose } = props;

    useEffect(() => {
        if (!open) return;

        setLoading(true);

        const tid = setTimeout(() => {
            setLoading(false);
        }, ANIMATION_DURATION);

        return () => {
            clearTimeout(tid);
        };
    }, [open]);

    useEffect(() => {
        const popup = popupRef.current;
        if (!popup) return;

        const closeCallback = () => onClose();

        const closeCallbackWithDelay = () => {
            setTimeout(closeCallback, ANIMATION_DURATION);
        };

        popup.addEventListener('close', closeCallbackWithDelay);
        return () => {
            popup.removeEventListener('close', closeCallbackWithDelay);
        };
    }, [onClose]);

    useEffect(() => {
        if (open) {
            popupRef.current?.showModal();
        }
    }, [open]);

    return (
        <PopupWindow
            ref={popupRef}
            title={`Solution for scenario ${props.scenario?.id ? `#${props.scenario.id}` : ''}`}>
            <div className="flex min-h-[60vh] min-w-[1000px] flex-col gap-6">
                {loading && (
                    <div className="flex h-[60vh] items-center justify-center">
                        <LoadingSpinner size={36} />
                    </div>
                )}
                {!loading && props.scenario && <GameLayout scenario={props.scenario} revealSolution />}{' '}
                {!loading && !props.scenario && <span>{'Error loading scenario'}</span>}
            </div>
        </PopupWindow>
    );
};
