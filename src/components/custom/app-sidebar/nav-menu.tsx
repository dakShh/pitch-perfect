'use client';

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Monitor } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavMenu({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: React.ElementType;
        isActive: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items?.map((item, index) => (
                    <SidebarMenuItem key={index}>
                        <SidebarMenuButton
                            asChild
                            tooltip={item.title}
                            className={`${
                                pathname.includes(`${item.url}`) && 'bg-muted'
                            } hover:bg-primary/20`}
                        >
                            <Link
                                href={`${item.url}`}
                                className={`text-lg ${pathname.includes(`${item.url}`) && 'font-bold'}`}
                            >
                                <Monitor className="text-lg" />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
