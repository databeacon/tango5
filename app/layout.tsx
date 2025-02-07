import { Barlow, B612 } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { tryCreateUser } from '~/lib/db/queries';
import { ThemeProvider } from '~/components/theme/theme-provider';
import { PostHogProvider } from '~/components/posthog/posthog-provider';
import { Toaster } from '~/components/ui/sonner';
import { SmallScreensProtection } from '~/components/ui/small-screens-protection';

import './globals.css';

const barlow = Barlow({
    weight: ['100', '300', '400', '700'],
    subsets: ['latin'],
    variable: '--font-barlow'
});

const b612 = B612({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-b612'
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await currentUser();
    if (user) {
        tryCreateUser(user.id);
    }

    return (
        <ClerkProvider>
            <html
                lang="en"
                className={`${barlow.variable} ${b612.variable}`}
                suppressHydrationWarning /* https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app */
            >
                <body>
                    <PostHogProvider>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                            <SmallScreensProtection>{children}</SmallScreensProtection>
                            <Toaster expand={true} />
                        </ThemeProvider>
                    </PostHogProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
