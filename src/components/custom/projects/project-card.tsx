'use client';

// Core
import { useRouter } from 'next/navigation';

// DB
import { Project } from '@prisma/client';

// Lib
import { cn, timeAgo } from '@/lib/utils';
import { itemVariants, themes } from '@/lib/constants';

// Zustand Store
import { useSlideStore } from '@/store/useSlideStore';

// Third Party
import { motion } from 'framer-motion';
import ThumbnailPreview from './thumbnail-preview';
import AlertBox from '../alert-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { recoverProject, softDeleteProject } from '@/actions/project';

interface Props {
    project: Project;
}

export default function ProjectCard({ project }: Props) {
    const { setSlides } = useSlideStore();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handleNavigation = () => {
        setSlides(JSON.parse(JSON.stringify(project.slides)));
        router.push(`/presentation/${project.id}`);
    };

    const theme = themes.find((theme) => theme.name === project.themeName) || themes[0];

    const handleRecover = async () => {
        setLoading(true);
        if (!project.id) {
            console.log(!project.id);
            setLoading(false);
            toast('Error', {
                description: 'Project not found',
            });
        }

        try {
            const res = await recoverProject(project.id);

            if (res.status !== 200) {
                // throw new Error('Failed to recover project');
                toast.success('Oppss..', {
                    description: res.error || 'Something went wrong! Please contact support.',
                });
                return;
            }

            setOpen(false);
            router.refresh();
            toast.success('Success', { description: 'Project recovered successfully!' });
        } catch (error) {
            console.log('handleRecover error: ', error);
            toast.success('Oppss..', { description: 'Something went wrong! Please contact support.' });
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        if (!project.id) {
            console.log(!project.id);
            setLoading(false);
            toast('Error', {
                description: 'Project not found',
            });
        }
        try {
            setLoading(true);
            const res = await softDeleteProject(project?.id);

            if (res.status !== 200) {
                toast.error('Error', {
                    description: res.error || 'Something went wrong! Please contact support',
                });
            }

            router.refresh();
            setOpen(false);
            setLoading(false);
            toast.success('Success', { description: 'Project deleted successfully! And moved to trash..' });
        } catch (error) {
            console.log('handleDelete error: ', error);
            toast.success('Oppss..', { description: 'Something went wrong! Please contact support.' });
        }
    };
    return (
        <motion.div
            variants={itemVariants}
            className={cn(
                'group w-full flex flex-col gap-y-3 rounded-xl p-6 transition-colors',
                `${!project?.isDeleted && 'hover:bg-muted'} border shadow-lg`
            )}
        >
            <div
                onClick={() => handleNavigation()}
                className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer "
            >
                <ThumbnailPreview slide={JSON.parse(JSON.stringify(project.slides))?.[0]} theme={theme} />
            </div>
            <div className="w-full">
                <div className="space-y-5">
                    <h3 className="font-semibold text-xl text-primary line-clamp-2">{project.title}</h3>
                    <div className="flex w-full justify-between items-center gap-2">
                        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                            {timeAgo(project.createdAt.toString())}
                        </p>
                        {/* Checkpoint: To make a dialogue box for recovery button */}
                        {project.isDeleted ? (
                            <AlertBox
                                open={open}
                                handleOpen={() => setOpen((prev) => !prev)}
                                description="This will recover your project and restore your data"
                                loading={loading}
                                onClick={handleRecover}
                            >
                                <Button size={'sm'} disabled={loading} className="">
                                    Recover
                                </Button>
                            </AlertBox>
                        ) : (
                            <AlertBox
                                open={open}
                                handleOpen={() => setOpen((prev) => !prev)}
                                description="This will delete project and all it's content"
                                loading={loading}
                                onClick={handleDelete}
                            >
                                <Button size={'sm'} disabled={loading} className="" variant={'destructive'}>
                                    Delete
                                </Button>
                            </AlertBox>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
