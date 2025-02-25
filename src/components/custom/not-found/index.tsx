import { cn } from '@/lib/utils';

export default function NotFound() {
    return (
        <div
            className={cn(
                'flex flex-col min-h-[70vh] w-full justify-center items-center gap-12',
                'text-muted-foreground'
            )}
        >
            Nothing to see, create a new project..
        </div>
    );
}
