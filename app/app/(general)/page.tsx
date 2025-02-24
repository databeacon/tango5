import Link from 'next/link';
import { VideoBackground } from '~/components/ui/video-background';
import { WelcomeTango5Title } from '~/components/ui/welcome-tango5-title';

export default async function Page() {
    return (
        <>
            <main className="relative z-20 flex h-screen flex-col items-center justify-center gap-10 p-6 md:p-10">
                <WelcomeTango5Title />
                <Link
                    href="/app/tutorial"
                    className="h-12 rounded-full bg-map px-8 py-2 font-barlow text-2xl font-bold leading-7 text-map-foreground shadow hover:bg-map/85">
                    WATCH TUTORIAL
                </Link>
                <Link
                    href="/app/play"
                    className="h-12 rounded-full bg-map px-8 py-2 font-barlow text-2xl font-bold leading-7 text-map-foreground shadow hover:bg-map/85">
                    PLAY
                </Link>
            </main>
            <VideoBackground />
        </>
    );
}
