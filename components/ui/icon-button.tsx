'use client';

import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import { PropsWithChildren } from 'react';

type IconButtonProps = {
    href?: string;
    onClick?: () => void;
    hoverText: string;
};

export const IconButton = (props: PropsWithChildren<IconButtonProps>) => {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                {props.href ? (
                    <Link href={props.href}>
                        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
                    </Link>
                ) : (
                    <button className="absolute" onClick={props.onClick}>
                        <TooltipTrigger onClick={props.onClick} asChild>
                            {props.children}
                        </TooltipTrigger>
                    </button>
                )}
                <TooltipContent className="bg-gray-700/60" side="bottom" sideOffset={10} align="center">
                    <span className="text-sm text-white">{props.hoverText}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
