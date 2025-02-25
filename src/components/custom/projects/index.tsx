// DB
import { containerVariants } from '@/lib/constants';
import { Project } from '@prisma/client';

// Third party
import { motion } from 'framer-motion';
import ProjectCard from './project-card';

interface Props {
    projects: Project[];
}

export default function Projects({ projects }: Props) {
    console.log('projects: ', projects);

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </motion.div>
    );
}
