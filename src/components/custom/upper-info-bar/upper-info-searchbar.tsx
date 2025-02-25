import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

export default function UpperInfoSearchBar() {
    return (
        <div className={cn('max-w-[60%] w-full relative', 'flex items-center border rounded-full')}>
            <Button
                variant={'ghost'}
                size={'sm'}
                type="submit"
                className="absolute left-0 h-full rounded-l-none bg-transparent hover:bg-transparent "
            >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
            </Button>

            <Input
                type="text"
                placeholder="Search by title"
                className="flex-grow bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 ml-6"
            />
        </div>
    );
}
