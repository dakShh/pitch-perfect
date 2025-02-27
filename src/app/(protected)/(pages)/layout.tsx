// Core
import { redirect } from 'next/navigation';

// Auth
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

// Components
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/app-sidebar';
import UpperInfoBar from '@/components/custom/upper-info-bar';

// Server Actions
import { getRecentProjects } from '@/actions/project';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const recentProjects = await getRecentProjects();

    const session = await getServerSession(authOptions);
    if (!session) redirect('/');

    return (
        <SidebarProvider>
            <AppSidebar user={session.user} recentProjects={recentProjects.data || []} />
            <SidebarInset>
                <UpperInfoBar user={session.user} />
                <div className="p-4"> {children}</div>
            </SidebarInset>

            {/* <main>
                <SidebarTrigger />
            </main> */}
        </SidebarProvider>
    );
}
