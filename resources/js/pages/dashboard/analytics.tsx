import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Navbar from "./navbar";
import { motion } from "framer-motion";

export default function Analytics() {
    const stats = {
        totalClicks: 150,
    }

    const chartData = [
        { date: "2025-09-01", clicks: 5 },
        { date: "2025-09-02", clicks: 12 },
        { date: "2025-09-03", clicks: 8 },
        { date: "2025-09-04", clicks: 20 },
        { date: "2025-09-05", clicks: 15 },
        { date: "2025-09-06", clicks: 25 },
        { date: "2025-09-07", clicks: 30 },
    ]

    const topLinks = [
        { id: 1, short: "https://lnkfy.io/abc123", original: "https://example.com/long-one", clicks: 42 },
        { id: 2, short: "https://lnkfy.io/ghlink", original: "https://github.com/colin/linkify", clicks: 31 },
        { id: 3, short: "https://lnkfy.io/blog", original: "https://colin.dev/blog", clicks: 22 },
    ]

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
                        {/* Stats card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">{stats.totalClicks} total clicks</p>
                            </CardContent>
                        </Card>

                        {/* Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Clicks Over Time</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="clicks" stroke="#2563eb" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Top links */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Links</CardTitle>
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
                                        {topLinks.map((link) => (
                                            <TableRow key={link.id}>
                                                <TableCell>
                                                    <a href={link.short} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">
                                                        {link.short}
                                                    </a>
                                                </TableCell>
                                                <TableCell className="truncate max-w-[250px]">{link.original}</TableCell>
                                                <TableCell>{link.clicks}</TableCell>
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


    )
}
