'use client';
// db
import { User } from '@prisma/client';

// Utils
import { cn } from '@/lib/utils';

// Components
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
// import { Separator } from '@/components/ui/separator';
import UpperInfoSearchBar from './upper-info-searchbar';
import NewProjectButton from './new-project-button';
import { Upload } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface UpperInfoBarTypes {
    user: User;
}
export default function UpperInfoBar({ user }: UpperInfoBarTypes) {
    console.log({ user });

    return (
        <header
            className={cn(
                'flex shrink-0 flex-wrap items-center justify-between gap-2',
                'sticky top-0 z-[10]',
                'bg-secondary shadow-sm p-4  '
            )}
        >
            <SidebarTrigger />
            {/* TODO: should look into the behavior of separator */}
            {/* <Separator orientation="vertical" /> */}
            <div className="w-full max-w-[95%] flex items-center justify-between gap-4 ">
                <UpperInfoSearchBar />
                <div className="flex items-center gap-x-2">
                    <Button onClick={() => signOut()} variant={'destructive'}>
                        Logout
                    </Button>
                    <Button size={'lg'} variant={'outline'} className="hover:bg-background">
                        <Upload />
                        Upload
                    </Button>
                    <NewProjectButton user={user} />
                </div>
            </div>
        </header>
    );
}
