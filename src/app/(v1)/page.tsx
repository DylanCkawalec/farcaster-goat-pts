'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Search, TrendingUp, Users, Award, Info, Clock, Repeat, BarChart3, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

// Mock data for bounties
const bounties = [
    {
        id: 1,
        title: 'Boost DAU for DeFi Swap',
        type: 'Founder',
        category: 'DAU Increase',
        points: 500,
        description: 'Increase Daily Active Users (DAU) for our DeFi Swap platform by 500 within 30 days.',
        projectUrl: 'https://defi-swap.example.com',
        projectName: 'DeFi Swap',
        projectLogo: 'https://picsum.photos/32/32?random=1',
        image: 'https://picsum.photos/400/200?random=11',
        target: '500 new DAU',
        currentMetric: '1,000 DAU',
        contractAddress: '0x1234...5678',
        functionName: 'increaseDau()',
    },
    {
        id: 2,
        title: 'Hodl ETH for 30 Days',
        type: 'Community',
        category: 'Hodl Challenge',
        points: 750,
        description: 'Hold ETH in the contract for 30 days without withdrawing.',
        projectUrl: 'https://hodl-eth.example.com',
        projectName: 'Hodl ETH',
        projectLogo: 'https://picsum.photos/32/32?random=2',
        image: 'https://picsum.photos/400/200?random=12',
        target: '30 days',
        currentMetric: '0 days',
        contractAddress: '0x2345...6789',
        functionName: 'startHodl()',
        timeSet: '30 days',
    },
    {
        id: 3,
        title: 'Pump TOKEN to $1',
        type: 'Founder',
        category: 'Pump Challenge',
        points: 1000,
        description: 'Increase the price of TOKEN to $1 within 14 days.',
        projectUrl: 'https://token-pump.example.com',
        projectName: 'TOKEN Pump',
        projectLogo: 'https://picsum.photos/32/32?random=3',
        image: 'https://picsum.photos/400/200?random=13',
        target: '$1.00',
        currentMetric: '$0.50',
        contractAddress: '0x3456...7890',
        functionName: 'checkPrice()',
        targetPrice: 1.0,
    },
    {
        id: 4,
        title: 'Swap for BTC',
        type: 'Community',
        category: 'BTC Challenge',
        points: 600,
        description: 'Swap USDT, USDC, ETH, DIA, or BUSD for BTC using our swap contract.',
        projectUrl: 'https://btc-swap.example.com',
        projectName: 'BTC Swap',
        projectLogo: 'https://picsum.photos/32/32?random=4',
        image: 'https://picsum.photos/400/200?random=14',
        target: '10 BTC swapped',
        currentMetric: '2 BTC swapped',
        contractAddress: '0x4567...8901',
        functionName: 'swapToBtc()',
    },
    {
        id: 5,
        title: 'Increase TOKEN/BTC Volume',
        type: 'Founder',
        category: 'Volume Challenge',
        points: 800,
        description: 'Increase the trading volume of TOKEN/BTC pair to 100 BTC within 7 days.',
        projectUrl: 'https://token-volume.example.com',
        projectName: 'TOKEN Volume',
        projectLogo: 'https://picsum.photos/32/32?random=5',
        image: 'https://picsum.photos/400/200?random=15',
        target: '100 BTC volume',
        currentMetric: '20 BTC volume',
        contractAddress: '0x5678...9012',
        functionName: 'checkVolume()',
    },
];

// Mock data for projects
const projects = [
    { id: 1, name: 'DeFi Swap', points: 1500, logo: 'https://picsum.photos/32/32?random=1', completedQuests: 15, activeQuests: 3, totalQuests: 20, change: 2 },
    { id: 2, name: 'Hodl ETH', points: 1200, logo: 'https://picsum.photos/32/32?random=2', completedQuests: 12, activeQuests: 2, totalQuests: 18, change: -1 },
    { id: 3, name: 'TOKEN Pump', points: 1000, logo: 'https://picsum.photos/32/32?random=3', completedQuests: 10, activeQuests: 5, totalQuests: 15, change: 1 },
    { id: 4, name: 'BTC Swap', points: 950, logo: 'https://picsum.photos/32/32?random=4', completedQuests: 9, activeQuests: 4, totalQuests: 14, change: 0 },
    { id: 5, name: 'TOKEN Volume', points: 1100, logo: 'https://picsum.photos/32/32?random=5', completedQuests: 11, activeQuests: 3, totalQuests: 16, change: 3 },
];

const bountyCategories: string[] = ['DAU Increase', 'Hodl Challenge', 'Pump Challenge', 'BTC Challenge', 'Volume Challenge'];

interface Bounty {
    id: number;
    title: string;
    type: string;
    category: string;
    points: number;
    description: string;
    projectUrl: string;
    projectName: string;
    projectLogo: string;
    image: string;
    target: string;
    currentMetric: string;
    contractAddress: string;
    functionName: string;
    targetPrice?: number;
    timeSet?: string;
}

interface BountyCardProps {
    bounty: Bounty;
    showDetails?: boolean;
}

function BountyCard({ bounty, showDetails = false }: BountyCardProps) {
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'DAU Increase':
                return <Users className="h-4 w-4" />;
            case 'Hodl Challenge':
                return <Clock className="h-4 w-4" />;
            case 'Pump Challenge':
                return <TrendingUp className="h-4 w-4" />;
            case 'BTC Challenge':
                return <Repeat className="h-4 w-4" />;
            case 'Volume Challenge':
                return <BarChart3 className="h-4 w-4" />;
            default:
                return <Info className="h-4 w-4" />;
        }
    };

    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative">
                <Image src={bounty.image} alt={bounty.title} width={400} height={250} className="w-full h-[200px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold mb-1 line-clamp-1">{bounty.title}</h3>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Image src={bounty.projectLogo} alt={bounty.projectName} width={24} height={24} className="rounded-full mr-2" />
                            <span className="text-sm">{bounty.projectName}</span>
                        </div>
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                            {bounty.points} Points
                        </Badge>
                    </div>
                </div>
            </div>
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline">{bounty.type}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                        {getCategoryIcon(bounty.category)}
                        {bounty.category}
                    </Badge>
                </div>
                <CardDescription className="mb-4 line-clamp-2">{bounty.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                            Details <Info className="ml-2 h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>{bounty.title}</DialogTitle>
                            <DialogDescription>Bounty Details</DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                            <Image src={bounty.image} alt={bounty.title} width={800} height={400} className="w-full h-64 object-cover rounded-lg mb-4" />
                            <div className="flex items-center mb-4">
                                <Image src={bounty.projectLogo} alt={bounty.projectName} width={32} height={32} className="mr-2 rounded-full" />
                                <span className="font-bold">{bounty.projectName}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Points</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold">{bounty.points}</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Target</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold">{bounty.target}</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Current</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold">{bounty.currentMetric}</p>
                                    </CardContent>
                                </Card>
                            </div>
                            <p className="mb-4">{bounty.description}</p>
                            <div className="mb-4">
                                <p>
                                    <strong>Contract Address:</strong> {bounty.contractAddress}
                                </p>
                                <p>
                                    <strong>Function Name:</strong> {bounty.functionName}
                                </p>
                                {bounty.timeSet && (
                                    <p>
                                        <strong>Time Set:</strong> {bounty.timeSet}
                                    </p>
                                )}
                                {bounty.targetPrice && (
                                    <p>
                                        <strong>Target Price:</strong> ${bounty.targetPrice.toFixed(2)}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button asChild className="flex-1">
                                    <a href={bounty.projectUrl} target="_blank" rel="noopener noreferrer">
                                        View Project <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    Claim Bounty <Award className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                <Button variant="default" className="flex-1">
                    Claim Bounty <Award className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function QuestsPage() {
    const [selectedType, setSelectedType] = useState<string>('All');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredBounties = bounties.filter(
        (bounty) =>
            (selectedType === 'All' || bounty.type === selectedType) &&
            (selectedCategory === 'All' || bounty.category === selectedCategory) &&
            bounty.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            <div className="bg-gradient-to-r from-primary to-primary-foreground py-8">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-white">Quests</h1>
                        <Card className="bg-background/20 backdrop-blur-sm text-white">
                            <CardContent className="flex items-center p-2">
                                <Award className="h-5 w-5 mr-2" />
                                <div>
                                    <p className="text-sm font-medium">Your Points</p>
                                    <p className="text-lg font-bold">1,250</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 space-y-8">
                <Tabs defaultValue="explore" className="space-y-6">
                    <TabsList className="w-full justify-start">
                        <TabsTrigger value="explore">Explore</TabsTrigger>
                        <TabsTrigger value="your-quests">Your Quests</TabsTrigger>
                        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                    </TabsList>

                    <TabsContent value="explore" className="space-y-6">
                        <div className="bg-muted p-6 rounded-lg mb-8">
                            <h2 className="text-3xl font-semibold mb-6">Featured Quests</h2>
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {bounties.slice(0, 3).map((bounty) => (
                                        <CarouselItem key={bounty.id} className="md:basis-1/2 lg:basis-2/3">
                                            <div className="p-1">
                                                <Card className="overflow-hidden">
                                                    <div className="relative">
                                                        <Image src={bounty.image} alt={bounty.title} width={800} height={400} className="w-full h-[400px] object-cover" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                            <h3 className="text-2xl font-semibold mb-2">{bounty.title}</h3>
                                                            <p className="mb-4 line-clamp-2">{bounty.description}</p>
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center">
                                                                    <Image src={bounty.projectLogo} alt={bounty.projectName} width={32} height={32} className="rounded-full mr-2" />
                                                                    <span className="text-lg">{bounty.projectName}</span>
                                                                </div>
                                                                <Badge variant="secondary" className="bg-primary text-primary-foreground text-lg">
                                                                    {bounty.points} Points
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>

                        <div className="sticky top-14 z-10 bg-background py-4 border-b">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Select value={selectedType} onValueChange={setSelectedType}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by type">{selectedType}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All Types</SelectItem>
                                        <SelectItem value="Founder">Founder</SelectItem>
                                        <SelectItem value="Community">Community</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by category">{selectedCategory}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All Categories</SelectItem>
                                        {bountyCategories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <div className="relative flex-grow">
                                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input placeholder="Search quests..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-8" />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredBounties.map((bounty) => (
                                <BountyCard key={bounty.id} bounty={bounty} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="your-quests">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {bounties
                                .filter((bounty) => bounty.type === 'Community')
                                .map((bounty) => (
                                    <BountyCard key={bounty.id} bounty={bounty} />
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="leaderboard">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Project Leaderboard</CardTitle>
                                <CardDescription>Top projects by points earned and quest completion</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {projects
                                        .sort((a, b) => b.points - a.points)
                                        .map((project, index) => (
                                            <div key={project.id} className="flex items-center space-x-4">
                                                <div className="flex-shrink-0 w-8 text-2xl font-bold text-muted-foreground">{index + 1}</div>
                                                <div className="flex-shrink-0">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={project.logo} alt={project.name} />
                                                        <AvatarFallback>{project.name.substring(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-lg font-semibold">{project.name}</h3>
                                                        <div className="flex items-center space-x-2">
                                                            <Badge variant="secondary" className="text-sm">
                                                                {project.points} points
                                                            </Badge>
                                                            {project.change > 0 && (
                                                                <Badge variant="default" className="flex items-center">
                                                                    <ArrowUp className="w-3 h-3 mr-1" />
                                                                    {project.change}
                                                                </Badge>
                                                            )}
                                                            {project.change < 0 && (
                                                                <Badge variant="destructive" className="flex items-center">
                                                                    <ArrowDown className="w-3 h-3 mr-1" />
                                                                    {Math.abs(project.change)}
                                                                </Badge>
                                                            )}
                                                            {project.change === 0 && (
                                                                <Badge variant="outline" className="flex items-center">
                                                                    <Minus className="w-3 h-3 mr-1" />
                                                                    {project.change}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                                                        <span>Completed: {project.completedQuests}</span>
                                                        <span>Active: {project.activeQuests}</span>
                                                        <span>Total: {project.totalQuests}</span>
                                                    </div>
                                                    <div className="mt-2">
                                                        <Progress value={(project.completedQuests / project.totalQuests) * 100} className="h-2" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
