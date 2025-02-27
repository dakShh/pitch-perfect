'use client';
// Core
import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// Third Party Lib
import { AnimatePresence, motion } from 'framer-motion';

// Zustand store
import usePromptStore from '@/store/usePromptStore';

// Components
import CreatePage from './CreatePage/CreatePage';
import CreativeAI from './GenerateAI/CreativeAi';

export default function RenderPage() {
    const router = useRouter();
    const { page, setPage } = usePromptStore();

    const handleSelectOption = (option: string) => {
        if (option === 'template') {
            router.push('/templates');
        } else if (option === 'create-scratch') {
            setPage('create-scratch');
        } else if (option === 'creative-ai') {
            setPage('creative-ai');
        }
    };

    const reset = () => setPage('create');
    const handleBack = () => reset();

    // useEffect(() => {
    //     reset();
    // }, []);
    const renderStep = () => {
        switch (page) {
            case 'create':
                return <CreatePage onSelectOption={handleSelectOption} />;
            case 'create-scratch':
                return <>create-scratch</>;
            case 'creative-ai':
                return <CreativeAI onBack={handleBack} />;
            default:
                return null;
        }
    };
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={page}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
            >
                {renderStep()}
            </motion.div>
        </AnimatePresence>
    );
}
