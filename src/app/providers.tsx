'use client';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface Providers {
    session: Session | null;
    children: React.ReactNode;
}

export default function Providers({ session, children }: Providers) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
