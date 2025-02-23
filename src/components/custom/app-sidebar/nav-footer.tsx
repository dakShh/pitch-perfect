'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { User } from '@prisma/client';
import Image from 'next/image';

interface NavFooterTypes {
    user: User;
}

export default function NavFooter({ user }: NavFooterTypes) {
    if (!user) {
        return null;
    }
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                {!user.subscription && (
                    <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle className="text-xl">Get Subscription</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Unlock more features
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                size={'lg'}
                                variant={'secondary'}
                                className={cn('w-full rounded-full shadow-md hover:shadow-none')}
                            >
                                Upgrade
                            </Button>
                        </CardContent>
                    </Card>
                )}

                <SidebarMenuButton size={'lg'} className="py-8">
                    <div className="flex gap-x-2 items-center">
                        {user.profileImage && (
                            <Image
                                width={40}
                                height={40}
                                src={user.profileImage}
                                className="rounded-full "
                                alt={'user-profile-img'}
                            ></Image>
                        )}
                        <div className="flex flex-col">
                            <div className="font-bold truncate">{user.name}</div>
                            <div className="text-muted-foreground text-xs truncate">{user.email}</div>
                        </div>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
