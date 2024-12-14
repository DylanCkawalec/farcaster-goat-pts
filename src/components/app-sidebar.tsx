'use client';

import * as React from 'react';
import { BookOpen, Bot, Command, Frame, LifeBuoy, Map, PieChart, Send, Settings2, SquareTerminal, Volleyball, User, Trophy, Globe } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { NavSecondary } from './nav-secondary';

const links = [
    {
        title: 'Quests',
        url: '/quests',
        icon: PieChart,
    },
    {
        title: 'Ecosystem',
        url: '/ecosystem',
        icon: Globe,
    },
    {
        title: 'Leaderboard',
        url: '/leaderboard',
        icon: Trophy,
    },
    {
        title: 'Request for Proposal',
        url: '/contracts/request-for-proposal',
        icon: Command,
        requiresWallet: true,
    },
    {
        title: 'Documentation',
        url: 'https://docs.goat.network/',
        icon: BookOpen,
        external: true,
    },
];

const secondaryLinks = [
    {
        title: 'Profile',
        url: '/profile',
        icon: User,
    },
    {
        title: 'Settings',
        url: '/settings',
        icon: Settings2,
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { isMobile } = useSidebar();

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Volleyball className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">GOAT Network</span>
                                    <span className="truncate text-xs">Ecosystem</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {links.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild className="py-2">
                                    <a href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                <NavSecondary items={secondaryLinks} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
        </Sidebar>
    );
}
