'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, Trophy, Wallet, User, Plus, BarChart3, FileText, LogOut, Menu } from 'lucide-react';

export default function NavigationHeader() {
    const [isConnected, setIsConnected] = useState(false);
    const [isFounder, setIsFounder] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const handleConnectWallet = () => {
        setIsConnected(true);
        setIsFounder(true); // For demonstration purposes
    };

    const handleLogout = () => {
        setIsConnected(false);
        setIsFounder(false);
    };

    const NavItem = ({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: React.ReactNode }) => {
        const isActive = pathname === href;
        return (
            <NavigationMenuItem>
                <NavigationMenuLink
                    href={href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:bg-muted hover:text-primary'
                    }`}
                >
                    <Icon className="w-4 h-4 mr-2" />
                    {children}
                </NavigationMenuLink>
            </NavigationMenuItem>
        );
    };

    const MobileNavItem = ({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: React.ReactNode }) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:bg-muted hover:text-primary'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <Icon className="w-5 h-5 mr-3" />
                {children}
            </Link>
        );
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="font-bold text-lg hidden md:block">
                        GOAT Founders Club
                    </Link>
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            <NavItem href="/" icon={Home}>
                                Quests
                            </NavItem>
                            <NavItem href="/projects" icon={Trophy}>
                                Projects
                            </NavItem>
                            <NavItem href="/leaderboard" icon={Trophy}>
                                Leaderboard
                            </NavItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center space-x-4">
                    {!isConnected ? (
                        <Button variant="outline" size="sm" onClick={handleConnectWallet} className="text-xs">
                            <Wallet className="w-4 h-4 mr-2" />
                            Connect Wallet
                        </Button>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                                    <User className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                {isFounder && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/create-quests" className="flex items-center">
                                            <Plus className="w-4 h-4 mr-2" />
                                            <span>Create Quests</span>
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem asChild>
                                    <Link href="/analytics" className="flex items-center">
                                        <BarChart3 className="w-4 h-4 mr-2" />
                                        <span>Analytics</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/founders" className="flex items-center">
                                        <FileText className="w-4 h-4 mr-2" />
                                        <span>Founders Page</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </header>
    );
}
