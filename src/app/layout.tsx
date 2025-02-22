import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { getSession } from './api/auth/[...nextauth]/options';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Pitch Perfect',
    description: 'Crazy Presentation Builder',
};

interface RootLayout {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayout) {
    const session = await getSession();
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers session={session}>{children}</Providers>
            </body>
        </html>
    );
}
