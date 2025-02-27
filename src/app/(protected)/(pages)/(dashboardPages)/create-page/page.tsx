// Core
import { Suspense } from 'react';

// Custom Page Component
import CreatePageSkeleton from './_components/CreatePage/CreatePageSkeleton';
import RenderPage from './_components/RenderPage';

export default function CreatePage() {
    return (
        <main className="w-full h-full pt-6">
            <Suspense fallback={<CreatePageSkeleton />}>
                <RenderPage />
            </Suspense>
        </main>
    );
}
