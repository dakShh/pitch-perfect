import { OutlineCard } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CreativeAiStore = {
    outlines: OutlineCard[] | [];
    addMultipleOutlines: (outlines: OutlineCard[]) => void;
    addOutline: (outline: OutlineCard) => void;
    currentAiPrompt: string;
    setCurrentAiPrompt: (currentAiPrompt: string) => void;
    resetOutlines: () => void;
};

const useCreativeAiStore = create<CreativeAiStore>()(
    persist(
        (set) => ({
            currentAiPrompt: '',
            outlines: [],
            addOutline: (outline: OutlineCard) => {
                set((state) => ({
                    outlines: [outline, ...state.outlines],
                }));
            },
            addMultipleOutlines: (outlines: OutlineCard[]) => {
                set(() => ({
                    outlines: [...outlines],
                }));
            },
            setCurrentAiPrompt: (prompt: string) => {
                set(() => ({ currentAiPrompt: prompt }));
            },
            resetOutlines: () => {
                set({ outlines: [] });
            },
        }),
        { name: 'creative-store' }
    )
);
export default useCreativeAiStore;
