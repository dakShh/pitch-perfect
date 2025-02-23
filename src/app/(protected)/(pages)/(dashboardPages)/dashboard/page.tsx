'use server';
import { getAllProjects } from '@/actions/project';

export default async function Dashboard() {
    const projects = await getAllProjects();
    console.log({ projects });

    return <div className="container mx-auto">dashboard</div>;
}
