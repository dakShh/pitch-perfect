'use client';

// Component
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
// import { useRouter } from 'next/navigation';

export default function NewProjectButton() {
    // WIP: Handling on click logic
    // const router = useRouter();

    return (
        <Button size={'lg'}>
            <Plus /> New Project
        </Button>
    );
}
