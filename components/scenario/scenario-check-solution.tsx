'use client';

import { useState, PropsWithoutRef } from 'react';
import { EyeIcon } from 'lucide-react';
import { GameSolutionViewer } from '~/components/game/game-solution-viewer';
import { ScenarioSelect } from '~/lib/types';

type ScenarioCheckSolutionProps = {
    scenario: ScenarioSelect;
};

export const ScenarioCheckSolution = (props: PropsWithoutRef<ScenarioCheckSolutionProps>) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <EyeIcon className="cursor-pointer" size={'1rem'} onClick={() => setOpen(true)} />
            <GameSolutionViewer scenario={props.scenario} open={open} onClose={() => setOpen(false)} />
        </>
    );
};
