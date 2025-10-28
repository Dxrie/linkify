import { usePage, router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash, Pencil } from "lucide-react";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

declare var route: (...args: any[]) => string;

export default function Prefixes() {
    const { prefixes } = usePage().props as any;
    const [newPrefix, setNewPrefix] = useState("");
    const [editingPrefixId, setEditingPrefixId] = useState<number | null>(null);
    const [editingPrefixName, setEditingPrefixName] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCreate = () => {
        if (!newPrefix) return

        router.post(route('dashboard.prefixes.store'), {
            name: newPrefix
        }, {
            onSuccess: () => {
                setNewPrefix("");
            },
            onError: (errors) => {
                console.error("Error creating prefix:", errors);
            }
        });
        setIsDialogOpen(false);
    }

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this prefix?')) {
            router.delete(route('dashboard.prefixes.destroy', id), {
                onSuccess: () => {
                },
                onError: (errors) => {
                    console.error("Error deleting prefix:", errors);
                }
            });
        }
    }

    const startEditing = (prefix: any) => {
        setEditingPrefixId(prefix.id);
        setEditingPrefixName(prefix.name);
    };

    const handleUpdate = () => {
        if (!editingPrefixId || !editingPrefixName) return;

        router.put(route('dashboard.prefixes.update', editingPrefixId), {
            name: editingPrefixName,
        }, {
            onSuccess: () => {
                setEditingPrefixId(null);
                setEditingPrefixName("");
            },
            onError: (errors) => {
                console.error("Error updating prefix:", errors);
            }
        });
    };

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
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                                                <TableCell>{formatDate(prefix.created_at)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => startEditing(prefix)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
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

                        {editingPrefixId !== null && (
                            <Dialog open={editingPrefixId !== null} onOpenChange={() => setEditingPrefixId(null)}>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Prefix</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="edit-prefix">Prefix Name</Label>
                                            <Input
                                                id="edit-prefix"
                                                value={editingPrefixName}
                                                onChange={(e) => setEditingPrefixName(e.target.value)}
                                            />
                                        </div>
                                        <Button onClick={handleUpdate}>Update</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </motion.div>
            </main>
        </div>
    );
}