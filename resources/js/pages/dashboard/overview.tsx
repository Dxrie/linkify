import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import Navbar from "./navbar";

type DashboardProps = {
    totalLinks: number;
    totalClicks: number;
    recentLinks: {
        id: number;
        unique_code: string;
        target_url: string;
        clicks_count: number;
    }[];
    clicksLast7Days: {
        day: string;
        clicks: number;
    }[];
    bestPerformingLink: {
        id: number;
        unique_code: string;
        target_url: string;
        clicks_count: number;
    };
};

export default function Overview() {
    const { totalLinks, totalClicks, recentLinks, clicksLast7Days, bestPerformingLink, appUrl } = usePage<DashboardProps>().props;

    return (
        <div className="flex flex-col h-screen w-full bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="p-6 space-y-6">
                        {/* Stats Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total Links</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold">{totalLinks}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total Clicks</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold">{totalClicks}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Link</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {recentLinks.length > 0 && (
                                        <>
                                            <Link
                                                href={`/${bestPerformingLink.unique_code}`}
                                                className="text-blue-500 underline"
                                            >
                                                {`${appUrl}/${bestPerformingLink.unique_code}`}
                                            </Link>
                                            <p className="text-sm text-muted-foreground">
                                                {bestPerformingLink.clicks_count} clicks
                                            </p>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Chart Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Clicks (Last 7 days)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={clicksLast7Days}>
                                        <XAxis dataKey="day" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="clicks" fill="#AB2346" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Recent Links Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Links</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Short URL</TableHead>
                                            <TableHead>Original URL</TableHead>
                                            <TableHead>Clicks</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentLinks.map((link) => (
                                            <TableRow key={link.id}>
                                                <TableCell>
                                                    <Link
                                                        href={`/${link.unique_code}`}
                                                        className="text-blue-500 underline"
                                                    >
                                                        {`${appUrl}/${link.unique_code}`}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{link.target_url}</TableCell>
                                                <TableCell>{link.clicks_count}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
