'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MoreHorizontal, ArrowUpDown, ChevronDown, Search, Trophy, Users, Wallet, Bitcoin, Award, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for GOAT Leaders
const goatLeaders = {
    mostActive: [
        { address: '0x1234...5678', value: 1000, change: 5, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Felix' },
        { address: '0x2345...6789', value: 950, change: -2, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Aneka' },
        { address: '0x3456...7890', value: 900, change: 1, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Jasper' },
    ],
    mostBullish: [
        { address: '0x4567...8901', value: 5000, change: 10, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Zoe' },
        { address: '0x5678...9012', value: 4800, change: -5, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Max' },
        { address: '0x6789...0123', value: 4600, change: 3, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Luna' },
    ],
    whales: [
        { address: '0x7890...1234', value: 1000000, change: 2, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Oliver' },
        { address: '0x8901...2345', value: 950000, change: 1, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Sophie' },
        { address: '0x9012...3456', value: 900000, change: -1, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Milo' },
    ],
    mostQuestPoints: [
        { address: '0x0123...4567', value: 10000, change: 15, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Chloe' },
        { address: '0x1234...5678', value: 9500, change: 5, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Leo' },
        { address: '0x2345...6789', value: 9000, change: -3, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Aria' },
    ],
    mostBTC: [
        { address: '0x3456...7890', value: 100, change: 2, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Finn' },
        { address: '0x4567...8901', value: 95, change: -1, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Nova' },
        { address: '0x5678...9012', value: 90, change: 1, avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Zack' },
    ],
};

// Mock data for Project Leaderboard
const projects: Project[] = [
    {
        id: '1',
        name: 'DeFi Swap',
        logo: 'https://api.dicebear.com/6.x/identicon/svg?seed=DeFi',
        contracts: 5,
        type: 'DEX',
        tvl: 1000000,
        trx: 50000,
        dau: 10000,
        questPoints: 5000,
        lastPosted: '2023-04-01',
        twitterFollowers: 50000,
        discordMembers: 20000,
    },
    {
        id: '2',
        name: 'Yield Farm',
        logo: 'https://api.dicebear.com/6.x/identicon/svg?seed=Yield',
        contracts: 3,
        type: 'Yield',
        tvl: 750000,
        trx: 30000,
        dau: 5000,
        questPoints: 3000,
        lastPosted: '2023-04-02',
        twitterFollowers: 30000,
        discordMembers: 15000,
    },
    {
        id: '3',
        name: 'NFT Marketplace',
        logo: 'https://api.dicebear.com/6.x/identicon/svg?seed=NFT',
        contracts: 7,
        type: 'NFT',
        tvl: 500000,
        trx: 20000,
        dau: 3000,
        questPoints: 2000,
        lastPosted: '2023-04-03',
        twitterFollowers: 25000,
        discordMembers: 10000,
    },
];

// Mock data for Quest Leaderboard
const questLeaderboard: QuestLeaderboardEntry[] = [
    {
        id: '1',
        address: '0x1234...5678',
        avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Felix',
        questPoints: 10000,
        earnedRewards: 5000,
        completedQuests: 50,
    },
    {
        id: '2',
        address: '0x2345...6789',
        avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Aneka',
        questPoints: 9500,
        earnedRewards: 4750,
        completedQuests: 48,
    },
    {
        id: '3',
        address: '0x3456...7890',
        avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Jasper',
        questPoints: 9000,
        earnedRewards: 4500,
        completedQuests: 45,
    },
];

// Interfaces
type Project = {
    id: string;
    name: string;
    logo: string;
    contracts: number;
    type: string;
    tvl: number;
    trx: number;
    dau: number;
    questPoints: number;
    lastPosted: string;
    twitterFollowers: number;
    discordMembers: number;
};

type QuestLeaderboardEntry = {
    id: string;
    address: string;
    avatar: string;
    questPoints: number;
    earnedRewards: number;
    completedQuests: number;
};

// DataTable component
function DataTable<T>({ data, columns }: { data: T[]; columns: { header: string; accessorKey: keyof T; className?: string }[] }) {
    const [sorting, setSorting] = useState<{ column: keyof T | null; direction: 'asc' | 'desc' }>({ column: null, direction: 'asc' });
    const [visibleColumns, setVisibleColumns] = useState<Set<keyof T>>(new Set(columns.map((col) => col.accessorKey)));
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const toggleColumnVisibility = (column: keyof T) => {
        setVisibleColumns((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(column)) {
                newSet.delete(column);
            } else {
                newSet.add(column);
            }
            return newSet;
        });
    };

    const sortedData = [...data].sort((a, b) => {
        if (sorting.column) {
            const aValue = a[sorting.column];
            const bValue = b[sorting.column];
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sorting.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sorting.direction === 'asc' ? aValue - bValue : bValue - aValue;
            }
        }
        return 0;
    });
    const filteredData = sortedData.filter((item) => 
        Object.values(item as Record<string, unknown>).some((value) => 
            typeof value === 'string' || typeof value === 'number' ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
        )
    );

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-8 max-w-sm" />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {columns.map((column) => (
                            <DropdownMenuCheckboxItem
                                key={column.accessorKey as string}
                                className="capitalize"
                                checked={visibleColumns.has(column.accessorKey)}
                                onCheckedChange={() => toggleColumnVisibility(column.accessorKey)}
                            >
                                {column.header}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns
                                .filter((col) => visibleColumns.has(col.accessorKey))
                                .map((column) => (
                                    <TableHead key={column.accessorKey as string} className={column.className}>
                                        <Button
                                            variant="ghost"
                                            onClick={() =>
                                                setSorting({
                                                    column: column.accessorKey,
                                                    direction: sorting.column === column.accessorKey && sorting.direction === 'asc' ? 'desc' : 'asc',
                                                })
                                            }
                                            className="hover:bg-transparent"
                                        >
                                            {column.header}
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((row, index) => (
                            <TableRow key={index}>
                                {columns
                                    .filter((col) => visibleColumns.has(col.accessorKey))
                                    .map((column) => (
                                        <TableCell key={column.accessorKey as string} className={column.className}>
                                            {column.accessorKey === 'name' || column.accessorKey === 'address' ? (
                                                <div className="flex items-center">
                                                    <Avatar className="h-8 w-8 mr-2">
                                                        <AvatarImage src={(row as any).logo || (row as any).avatar} />
                                                        <AvatarFallback>{(row as any).name?.charAt(0) || (row as any).address?.charAt(2)}</AvatarFallback>
                                                    </Avatar>
                                                    {row[column.accessorKey]?.toString()}
                                                </div>
                                            ) : column.accessorKey === 'tvl' || column.accessorKey === 'earnedRewards' ? (
                                                `$${Number(row[column.accessorKey]).toLocaleString()}`
                                            ) : column.accessorKey === 'trx' || column.accessorKey === 'dau' ? (
                                                Number(row[column.accessorKey]).toLocaleString()
                                            ) : (
                                                row[column.accessorKey]?.toString()
                                            )}
                                        </TableCell>
                                    ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
                </div>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)))}
                        disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function LeaderboardPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8">GOAT Founders Club Leaderboard</h1>
            <Tabs defaultValue="goat-leaders" className="space-y-6">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="goat-leaders">GOAT Leaders</TabsTrigger>
                    <TabsTrigger value="project-leaderboard">Project Leaderboard</TabsTrigger>
                    <TabsTrigger value="quest-leaderboard">Quest Leaderboard</TabsTrigger>
                </TabsList>

                <TabsContent value="goat-leaders">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(goatLeaders).map(([category, leaders]) => (
                            <Card key={category} className="overflow-hidden">
                                <CardHeader className="bg-muted">
                                    <CardTitle className="flex items-center space-x-2">
                                        {category === 'mostActive' && <Users className="h-5 w-5" />}
                                        {category === 'mostBullish' && <TrendingUp className="h-5 w-5" />}
                                        {category === 'whales' && <Wallet className="h-5 w-5" />}
                                        {category === 'mostQuestPoints' && <Trophy className="h-5 w-5" />}
                                        {category === 'mostBTC' && <Bitcoin className="h-5 w-5" />}
                                        <span className="capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <ul className="divide-y divide-muted">
                                        {leaders.map((leader, index) => (
                                            <li key={index} className="flex justify-between items-center p-4 hover:bg-muted/50 transition-colors">
                                                <div className="flex items-center space-x-3">
                                                    <span className="font-bold text-muted-foreground">{index + 1}</span>
                                                    <Avatar>
                                                        <AvatarImage src={leader.avatar} />
                                                        <AvatarFallback>{leader.address.charAt(2)}</AvatarFallback>
                                                    </Avatar>
                                                    <Link href={`/wallet/${leader.address}`} className="text-primary hover:underline">
                                                        {leader.address}
                                                    </Link>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-semibold">{leader.value.toLocaleString()}</span>
                                                    <Badge variant={leader.change > 0 ? 'default' : leader.change < 0 ? 'destructive' : 'secondary'}>
                                                        {leader.change > 0 ? '+' : ''}
                                                        {leader.change}%
                                                    </Badge>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="project-leaderboard">
                    <DataTable
                        data={projects}
                        columns={[
                            { header: 'Project Name', accessorKey: 'name', className: 'font-medium' },
                            { header: 'Contracts', accessorKey: 'contracts', className: 'text-center' },
                            { header: 'Type', accessorKey: 'type', className: 'uppercase' },
                            { header: 'TVL', accessorKey: 'tvl', className: 'text-right' },
                            { header: 'TRX', accessorKey: 'trx', className: 'text-right' },
                            { header: 'DAU', accessorKey: 'dau', className: 'text-right' },
                            { header: 'Quest Points', accessorKey: 'questPoints', className: 'text-right' },
                        ]}
                    />
                </TabsContent>

                <TabsContent value="quest-leaderboard">
                    <DataTable
                        data={questLeaderboard}
                        columns={[
                            { header: 'Wallet Address', accessorKey: 'address', className: 'font-medium' },
                            { header: 'Quest Points', accessorKey: 'questPoints', className: 'text-right' },
                            { header: 'Earned Rewards', accessorKey: 'earnedRewards', className: 'text-right' },
                            { header: 'Completed Quests', accessorKey: 'completedQuests', className: 'text-right' },
                        ]}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
