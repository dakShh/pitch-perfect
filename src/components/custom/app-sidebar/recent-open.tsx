'use client';
import { Button } from '@/components/ui/button';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { cn } from '@/lib/utils';
import { useSlideStore } from '@/store/useSlideStore';
import { Project } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type RecentOpenTypes = { recentProjects: Project[] };

export default function RecentOpen({ recentProjects }: RecentOpenTypes) {
    const router = useRouter();
    const { setSlides } = useSlideStore();

    function handleClick(projectId: string, slides: JsonValue) {
        if (!projectId || !slides) {
            toast.error('Project not found!');
            return;
        }

        setSlides(JSON.parse(JSON.stringify(slides)));
        router.push(`/presentation/${projectId}`);
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="font-medium text-sm">Recently Open </SidebarGroupLabel>
            <SidebarMenu>
                {recentProjects.length === 0 ? (
                    <SidebarMenuItem>
                        <p className={cn('px-2 pt-4', 'text-xs text-muted-foreground')}>
                            No Recent Projects
                        </p>
                    </SidebarMenuItem>
                ) : (
                    recentProjects?.map((project) => (
                        <SidebarMenuItem key={project.id}>
                            <SidebarMenuButton
                                asChild
                                tooltip={project.title ?? ''}
                                className="hover:bg-primary/20"
                            >
                                <Button
                                    variant={'link'}
                                    className="text-xs items-center justify-start hover:no-underline text-primary-foreground/80"
                                    onClick={() => handleClick(project.id, project.slides)}
                                >
                                    {project.title ?? 'No title'}
                                </Button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
