// db
import { Project, User } from '@prisma/client';

// Components
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuButton,
} from '@/components/ui/sidebar';
import NavMenu from './nav-menu';
import RecentOpen from './recent-open';

// Constants
import { data } from '@/lib/constants';

type AppSidebarTypes = {
    recentProjects?: Project[];
    user: User;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ recentProjects, user, ...props }: AppSidebarTypes) {
    console.log(user);

    return (
        <Sidebar collapsible="icon" className=" " {...props}>
            <SidebarHeader className="pt-3 px-3 pb-0">
                <SidebarMenuButton size={'lg'}>
                    <div className="text-xl font-extrabold">PitchPerfect</div>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent className="px-3 mt-10 gap-y-6">
                <NavMenu items={data.navMenu} />
                <RecentOpen recentProjects={recentProjects || []} />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
