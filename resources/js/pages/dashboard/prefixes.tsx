import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";
import Navbar from "./navbar";
import { motion } from "framer-motion";

export default function Prefixes() {
    const [prefixes, setPrefixes] = useState([
        { id: 1, name: "blog", created: "2025-09-01" },
        { id: 2, name: "promo", created: "2025-09-05" },
    ])

    const [newPrefix, setNewPrefix] = useState("")

    const handleCreate = () => {
        if (!newPrefix) return
        const newEntry = {
            id: prefixes.length + 1,
            name: newPrefix,
            created: new Date().toISOString().split("T")[0],
        }
        setPrefixes([newEntry, ...prefixes])
        setNewPrefix("")
    }

    const handleDelete = (id: number) => {
        setPrefixes(prefixes.filter((p) => p.id !== id))
    }

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
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Prefixes</CardTitle>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="h-4 w-4 mr-2" /> New Prefix
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Create a New Prefix</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="prefix">Prefix</Label>
                                                <Input
                                                    id="prefix"
                                                    placeholder="e.g. blog, promo, campaign"
                                                    value={newPrefix}
                                                    onChange={(e) => setNewPrefix(e.target.value)}
                                                />
                                            </div>
                                            <Button onClick={handleCreate}>Create</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Created</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {prefixes.map((prefix) => (
                                            <TableRow key={prefix.id}>
                                                <TableCell>{prefix.name}</TableCell>
                                                <TableCell>{prefix.created}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-red-500"
                                                        onClick={() => handleDelete(prefix.id)}
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
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
