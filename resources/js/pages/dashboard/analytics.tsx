import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Navbar from "./navbar";
import { motion } from "framer-motion";

export default function Analytics({ totalClicks, clicksOverTime, topLinks }) {
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
                                <p className="text-2xl font-bold">{totalClicks} total clicks</p>
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
                                        <LineChart data={clicksOverTime}>
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
                                                    <a href={link.short_url} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">
                                                        {link.short_url}
                                                    </a>
                                                </TableCell>
                                                <TableCell className="truncate max-w-[250px]">{link.target_url}</TableCell>
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


    )
}
