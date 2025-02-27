'use client';
// Core
import { useState } from 'react';

// Third Party Lib
import { motion } from 'framer-motion';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Icons
import { ChevronLeft, Loader2, RotateCcw } from 'lucide-react';

// Zustand Store
import useCreativeAiStore from '@/store/useCreativeAiStore';

// Constants
import { containerVariants, itemVariants } from '@/lib/constants';
import CardList from '../Common/CardList';

interface Props {
    onBack: () => void;
}

export default function CreativeAI({ onBack }: Props) {
    const { currentAiPrompt, setCurrentAiPrompt, outlines, resetOutlines } = useCreativeAiStore();

    const [noOfCards, setNoOfCard] = useState(0);
    const [editingCard, setEditingCard] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [editText, setEditText] = useState('');

    const handleBack = () => {
        onBack();
    };

    const resetCard = () => {
        setEditingCard(null);
        setSelectedCard(null);
        setEditText('');
        setCurrentAiPrompt('');

        resetOutlines();
    };

    // WIP:
    const generateOutline = () => {};
    return (
        <motion.div
            className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Button onClick={handleBack} variant={'outline'} className="mb-4">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
            <motion.div variants={itemVariants} className="text-center space-y-2">
                <h1 className="text-4xl font-bold">
                    Generate with <span className="text-primary">CreativeAI</span>
                </h1>
                <p className="text-muted-foreground">What would you like to create today? </p>
            </motion.div>
            <motion.div
                className="bg-secondary shadow-lg shadow-neutral-200 p-4 rounded-xl"
                variants={itemVariants}
            >
                <div className=" flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
                    <Input
                        placeholder="Enter prompt and add to the cards..."
                        className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow "
                        required
                        value={currentAiPrompt}
                        onChange={(e) => setCurrentAiPrompt(e.target.value)}
                    />
                    <div className="flex items-center gap-3">
                        <Select
                            value={noOfCards.toString()}
                            onValueChange={(value) => setNoOfCard(parseInt(value))}
                        >
                            <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                                <SelectValue placeholder="Select number of cards" />
                            </SelectTrigger>
                            <SelectContent className="w-fit">
                                {outlines.length === 0 ? (
                                    <SelectItem value="0" className="font-semibold">
                                        No Cards
                                    </SelectItem>
                                ) : (
                                    Array.from({ length: outlines.length }, (_, index) => index + 1).map(
                                        (num) => (
                                            <SelectItem
                                                key={num}
                                                value={num.toString()}
                                                className="font-semibold"
                                            >
                                                {num} {num === 1 ? 'Card' : 'Cards'}
                                            </SelectItem>
                                        )
                                    )
                                )}
                            </SelectContent>
                        </Select>
                        <Button
                            variant={'destructive'}
                            onClick={resetCard}
                            size="icon"
                            aria-label="Reset cards"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </motion.div>

            <div className="w-full flex justify-center items-center">
                <Button
                    className="font-semibold text-sm flex gap-2 items-center"
                    // onClick={generateOutline}
                    disabled={isGenerating}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="animate-spin mr-2" /> Generating...
                        </>
                    ) : (
                        'Generate Outline'
                    )}
                </Button>
            </div>

            <CardList />
        </motion.div>
    );
}
