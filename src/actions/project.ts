'use server';

import { getSession } from '@/app/api/auth/[...nextauth]/options';
import { prisma } from '@/lib/prismaClient';

export const getAllProjects = async () => {
    try {
        const session = await getSession();
        if (!session) return { status: 403, error: 'User not authenticated' };

        const projects = await prisma.project.findMany({
            where: { userId: session?.user?.id, isDeleted: false },
            orderBy: { updatedAt: 'desc' },
        });

        if (projects.length === 0) return { status: 404, error: 'No Projects found' };

        return {
            status: 200,
            data: projects,
        };
    } catch (error) {
        console.error('getAllProjects error: ', error);
        return { status: 500 };
    }
};

export const getRecentProjects = async () => {
    try {
        const session = await getSession();
        if (!session) return { status: 403, error: 'User not authenticated' };

        const projects = await prisma.project.findMany({
            where: { userId: session?.user?.id, isDeleted: false },
            orderBy: { updatedAt: 'desc' },
            take: 5,
        });

        if (projects.length === 0) return { status: 404, error: 'No Recent Projects Available' };

        return {
            status: 200,
            data: projects,
        };
    } catch (error) {
        console.error('getAllProjects error: ', error);
        return { status: 500 };
    }
};

export const recoverProject = async (projectId: string) => {
    try {
        const session = await getSession();
        if (!session) return { status: 403, error: 'User not authenticated' };

        const updatedProject = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                isDeleted: false,
            },
        });

        if (!updatedProject) {
            return { status: 500, error: 'Failed to recover project!' };
        }

        return { status: 200, data: updatedProject };
    } catch (error) {
        console.error('recoverProject: ', error);
        return { status: 500 };
    }
};

export const softDeleteProject = async (projectId: string) => {
    const session = await getSession();
    if (!session) return { status: 403, error: 'User not authenticated' };

    try {
        const deletedProject = await prisma.project.update({
            where: { id: projectId },
            data: { isDeleted: true },
        });

        if (!deletedProject) {
            return { status: 500, error: 'Error deleting the project! Try again later..' };
        }

        return {
            status: 200,
            data: deletedProject,
        };
    } catch (error) {
        console.error('softDeleteProject error: ', error);
        return { status: 500 };
    }
};
