'use client';

// Component
import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
    user: User;
}

export default function NewProjectButton({ user }: Props) {
    // WIP: Handling on click logic
    const router = useRouter();

    if (!user) return;
    return (
        <Button size={'lg'} disabled={!user.subscription} onClick={() => router.push('/create-page')}>
            <Plus /> New Project
        </Button>
    );
}
