'use client';

import { Session } from 'next-auth';

import { Button } from '../ui/button';

import { cn } from '@/lib/utils';
import { signIn, signOut } from 'next-auth/react';

export default function Header({ session }: { session: Session | null }) {
    console.log({ session });

    return (
        <div className={cn('flex justify-between', 'px-10 py-5')}>
            <div>Pitch Perfect</div>
            <div>
                {session ? (
                    <Button onClick={() => signOut()}>Logout</Button>
                ) : (
                    <Button onClick={() => signIn('google')}>Get Started</Button>
                )}
            </div>
        </div>
    );
}
