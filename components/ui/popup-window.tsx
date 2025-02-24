'use client';

import { PropsWithChildren, RefObject } from 'react';
import { X } from 'lucide-react';

import './popup-window.css';

type PopupWindowProps = {
    ref: RefObject<HTMLDialogElement | null>;
    title: string;
};

export const PopupWindow = (props: PropsWithChildren<PopupWindowProps>) => {
    return (
        <dialog ref={props.ref} className="fixed inset-0 z-50 rounded-lg bg-gray-200">
            <div className="relative flex max-h-[60vh] max-w-[1200px] flex-col font-barlow text-gray-900">
                <div className="absolute top-0 z-20 flex w-full items-center justify-between p-6">
                    <h3 className="text-2xl font-light text-white">{props.title}</h3>
                    <X
                        className="size-6 flex-shrink-0 cursor-pointer text-white"
                        onClick={() => props.ref.current?.close()}
                    />
                </div>
                {props.children}
            </div>
        </dialog>
    );
};
