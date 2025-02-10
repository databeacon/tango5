'use client';

import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { LinkButton } from './link-button';
import { useParams, usePathname } from 'next/navigation';
import { PropsWithoutRef, useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar = (props: PropsWithoutRef<{ backstageAccess: boolean }>) => {
    const pathname = usePathname();
    const params = useParams();
    const [anchor, setAnchor] = useState('');

    useEffect(() => {
        setAnchor(window.location.hash);
    }, [params]);

    return (
        <nav className="fixed z-30 w-full">
            <div className="flex h-[130px] flex-col justify-center bg-navbarBG">
                <div className="flex items-center justify-between px-12 text-xl">
                    <div>
                        <Link href="/">
                            <Image src="/images/tango5-logo.svg" width={30} height={37} alt={'Tango5'} />
                        </Link>
                    </div>
                    <div className="flex flex-row">
                        <LinkButton
                            href="/app/tutorial"
                            className={`text-xl text-white ${pathname === '/app/tutorial' && anchor !== '#faq' ? 'font-BarlowBold' : 'font-BarlowLight'}`}
                            variant="link">
                            Tutorial
                        </LinkButton>
                        <LinkButton
                            href="/app/tutorial#faq"
                            className={`text-xl text-white ${pathname === '/app/tutorial' && anchor === '#faq' ? 'font-BarlowBold' : 'font-BarlowLight'}`}
                            variant="link">
                            FAQ
                        </LinkButton>
                        <LinkButton
                            href="/app/scores"
                            className={`text-xl text-white ${pathname === '/app/scores' ? 'font-BarlowBold' : 'font-BarlowLight'}`}
                            variant="link">
                            Scores
                        </LinkButton>
                        <LinkButton href="/app/play" className="text-xl" variant="map">
                            Play
                        </LinkButton>
                        {props.backstageAccess && (
                            <LinkButton
                                href="/backstage"
                                className={`text-xl text-white ${pathname.includes('/backstage') ? 'font-BarlowBold' : 'font-BarlowLight'}`}
                                variant="link">
                                Backstage
                            </LinkButton>
                        )}
                        <SignedOut>
                            <SignIn routing="hash" />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export { Navbar };
