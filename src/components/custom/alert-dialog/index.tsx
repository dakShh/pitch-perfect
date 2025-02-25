import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
    description: string;
    loading?: boolean;
    onClick?: () => void;
    open: boolean;
    handleOpen: () => void;
}

export default function AlertBox({
    children,
    className,
    description,
    loading,
    onClick,
    open,
    handleOpen,
}: Props) {
    return (
        <AlertDialog open={open} onOpenChange={handleOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <Button variant={'destructive'} className={`${className}`} onClick={onClick}>
                        {loading ? (
                            <>
                                <Loader2 className="animate" />
                                loader....
                            </>
                        ) : (
                            'Continue'
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
