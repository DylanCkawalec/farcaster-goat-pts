'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { PlatformMetricsTrend } from "@/components/charts/platform-metrics-trend"
import { GOATMetricsChart } from "@/components/charts/goat-metrics-chart"

// GOAT Club data
const GOATClubData = [
    { title: 'Wallets Most Active by DAU', wallets: ['0x1234...5678', '0x2345...6789', '0x3456...7890'] },
    { title: 'Wallets Most Bullish by TRX', wallets: ['0x4567...8901', '0x5678...9012', '0x6789...0123'] },
    { title: 'Wallets Whales by TVL', wallets: ['0x7890...1234', '0x8901...2345', '0x9012...3456'] },
    { title: 'Wallets with most Quest Points', wallets: ['0x0123...4567', '0x1234...5678', '0x2345...6789'] },
    { title: 'Wallets with the Most BTC', wallets: ['0x3456...7890', '0x4567...8901', '0x5678...9012'] },
];

// Project data
const projectData: Project[] = [
    {
        id: '1',
        name: 'DeFi Swap',
        contracts: 5,
        type: 'DEX',
        tvl: 5000000000,
        trx: 1000000,
        dau: 500000,
        questPoints: 10000,
        lastPosted: '2023-07-15',
        twitterFollowers: 1000000,
        discordMembers: 500000,
    },
    {
        id: '2',
        name: 'Yield Farm',
        contracts: 3,
        type: 'Yield',
        tvl: 3000000000,
        trx: 750000,
        dau: 300000,
        questPoints: 8000,
        lastPosted: '2023-07-14',
        twitterFollowers: 800000,
        discordMembers: 400000,
    },
    {
        id: '3',
        name: 'NFT Marketplace',
        contracts: 4,
        type: 'NFT',
        tvl: 2000000000,
        trx: 500000,
        dau: 200000,
        questPoints: 6000,
        lastPosted: '2023-07-13',
        twitterFollowers: 600000,
        discordMembers: 300000,
    },
];

// Quest Leaderboard data
const questLeaderboardData: QuestLeaderboardEntry[] = [
    {
        id: '1',
        address: '0x1234...5678',
        questPoints: 10000,
        earnedRewards: 50,
        completedQuests: 25,
    },
    {
        id: '2',
        address: '0x2345...6789',
        questPoints: 8500,
        earnedRewards: 40,
        completedQuests: 20,
    },
    {
        id: '3',
        address: '0x3456...7890',
        questPoints: 7200,
        earnedRewards: 35,
        completedQuests: 18,
    },
];

type Project = {
    id: string;
    name: string;
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
    questPoints: number;
    earnedRewards: number;
    completedQuests: number;
};

const projectColumns: ColumnDef<Project>[] = [
    {
        accessorKey: 'name',
        header: 'Project Name',
        cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'contracts',
        header: 'Contracts',
        cell: ({ row }) => <div className="text-center">{row.getValue('contracts')}</div>,
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => <div className="capitalize">{row.getValue('type')}</div>,
    },
    {
        accessorKey: 'tvl',
        header: () => <div className="text-right">TVL</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('tvl'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                maximumFractionDigits: 1,
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'trx',
        header: () => <div className="text-right">TRX</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('trx'));
            const formatted = new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'dau',
        header: () => <div className="text-right">DAU</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('dau'));
            const formatted = new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'questPoints',
        header: () => <div className="text-right">Quest Points</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('questPoints'));
            const formatted = new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
];

const questLeaderboardColumns: ColumnDef<QuestLeaderboardEntry>[] = [
    {
        accessorKey: 'address',
        header: 'Wallet Address',
        cell: ({ row }) => (
            <Link href={`/profile/${row.getValue('address')}`} className="font-mono text-blue-600 hover:underline">
                {row.getValue('address')}
            </Link>
        ),
    },
    {
        accessorKey: 'questPoints',
        header: () => <div className="text-right">Quest Points</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('questPoints'));
            const formatted = new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'earnedRewards',
        header: () => <div className="text-right">Earned Rewards</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('earnedRewards'));
            const formatted = new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 2,
            }).format(amount);
            return <div className="text-right font-medium">{formatted}K</div>;
        },
    },
    {
        accessorKey: 'completedQuests',
        header: () => <div className="text-right">Completed Quests</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('completedQuests'));
            return <div className="text-right font-medium">{amount}</div>;
        },
    },
];

function DataTable<TData, TValue>({ columns, data }: { columns: ColumnDef<TData, TValue>[]; data: TData[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter..."
                    //   value={(table.getColumn(columns[0].id!).getFilterValue()) ?? ""}
                    onChange={
                        (event) => {}
                        // table.getColumn(columns[0].id)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </div>
    );
}

const platformMetricsData = [
  {
    month: "Jan",
    tvl: projectData[0].tvl,
    trx: projectData[0].trx,
    dau: projectData[0].dau,
  },
  {
    month: "Feb",
    tvl: projectData[1].tvl,
    trx: projectData[1].trx,
    dau: projectData[1].dau,
  },
  {
    month: "Mar",
    tvl: projectData[2].tvl,
    trx: projectData[2].trx,
    dau: projectData[2].dau,
  },
]

export default function LeaderboardPage() {
    const [activeMetric, setActiveMetric] = React.useState("tvl")
    
    return (
        <div className="container mx-auto py-10">
            <Tabs defaultValue="GOATclub" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="GOATclub">GOAT Leaders</TabsTrigger>
                    <TabsTrigger value="projects">Project Leaderboard</TabsTrigger>
                    <TabsTrigger value="questleaderboard">Quest Leaderboard</TabsTrigger>
                </TabsList>
                <TabsContent value="GOATclub">
                    <GOATMetricsChart 
                        data={platformMetricsData}
                        activeTab={activeMetric}
                        setActiveTab={setActiveMetric}
                    />
                    <h2 className="text-2xl font-bold mb-4">GOAT Leaders</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {GOATClubData.map((category, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{category.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc pl-5">
                                        {category.wallets.map((wallet, walletIndex) => (
                                            <li key={walletIndex}>
                                                <Link href={`/profile/${wallet}`} className="text-blue-600 hover:underline">
                                                    {wallet}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="projects">
                    <GOATMetricsChart 
                        data={platformMetricsData}
                        activeTab={activeMetric}
                        setActiveTab={setActiveMetric}
                    />
                    <h2 className="text-2xl font-bold mb-4">Project Leaderboard</h2>
                    <DataTable columns={projectColumns} data={projectData} />
                </TabsContent>
                <TabsContent value="questleaderboard">
                    <h2 className="text-2xl font-bold mb-4">Quest Leaderboard</h2>
                    <DataTable columns={questLeaderboardColumns} data={questLeaderboardData} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
