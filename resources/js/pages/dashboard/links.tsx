import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Edit, Trash, Plus, Check, Cross, CircleAlert, Link } from "lucide-react";
import Navbar from "./navbar";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, usePage } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDate } from "@/lib/utils";

type Link = {
    id: number;
    target_url: string;
    unique_code: string;
    clicks_count: number;
    created_at: string;
};

export default function MyLinks() {
    const { links, appUrl }: { links: Link[], appUrl: string; } = usePage().props;
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const { data: createData, setData: setCreateData, post: createPost, processing: createProcessing, errors: createErrors } = useForm({
        originalUrl: "",
        customShortCode: "",
    });
    const { data: editData, setData: setEditData, put: editPut, processing: editProcessing, errors: editErrors } = useForm({
        id: 0,
        originalUrl: "",
        customShortCode: "",
    });
    const [newLinkOpen, setNewLinkOpen] = useState<boolean>(false);
    const [editLinkOpen, setEditLinkOpen] = useState<{ index: number | null; isOpen: boolean }>({
        index: null,
        isOpen: false,
    });

    const handleEditLinkOpen = (status: boolean, index: number, link: Link) => {
        setEditLinkOpen({
            index: index,
            isOpen: status,
        });
        setEditData({
            id: link.id,
            customShortCode: link.unique_code,
            originalUrl: link.target_url,
        });
    };

    const handleCopy = (uniqueCode: string) => {
        const shortUrl = `${appUrl}/${uniqueCode}`;
        navigator.clipboard.writeText(shortUrl);

        setAlertMessage(`Copied "${shortUrl}" to clipboard!`);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    const handleCreate = () => {
        if (!createData.originalUrl) return;

        createPost(route("dashboard.links.create"), {
            onSuccess: () => {
                setNewLinkOpen(false);
                setCreateData({ originalUrl: "", customShortCode: "" });
                setAlertMessage("Link created successfully!");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            },
            onError: () => {
                setNewLinkOpen(false);
                setAlertMessage("Failed to create link. Please check the errors.");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            },
        });
    };

    const handleEdit = () => {
        if (!editData.originalUrl) return;

        editPut(route("dashboard.links.edit"), {
            onSuccess: () => {
                setEditLinkOpen({ index: null, isOpen: false });
                setAlertMessage("Link updated successfully!");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            },
            onError: () => {
                setEditLinkOpen({ ...editLinkOpen, isOpen: false });
                setAlertMessage("Failed to update link. Please check the errors.");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            },
        });
    };

    useEffect(() => {
        console.log(editData);
    }, [editData]);

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
                                <CardTitle>My Links</CardTitle>
                                <Dialog open={newLinkOpen} onOpenChange={setNewLinkOpen}>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="h-4 w-4 mr-2" /> New Link
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Create a New Short Link</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="url">Original URL</Label>
                                                <Input
                                                    id="url"
                                                    placeholder="https://example.com"
                                                    value={createData.originalUrl}
                                                    onChange={(e) => setCreateData("originalUrl", e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="customShortCode">Custom Short Code (Optional)</Label>
                                                <Input
                                                    id="customShortCode"
                                                    placeholder="XXXXXX"
                                                    value={createData.customShortCode}
                                                    onChange={(e) => setCreateData("customShortCode", e.target.value)}
                                                />
                                            </div>
                                            <Button disabled={createProcessing} onClick={handleCreate}>{createProcessing ? "Creating..." : "Create"}</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Original URL</TableHead>
                                            <TableHead>Short URL</TableHead>
                                            <TableHead>Clicks</TableHead>
                                            <TableHead>Created</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {links.map((link: Link, index) => (
                                            <TableRow key={link.id}>
                                                <TableCell className="truncate max-w-[250px]">{link.target_url}</TableCell>
                                                <TableCell>
                                                    <a href={`${appUrl}/${link.unique_code}`} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">
                                                        {appUrl}/{link.unique_code}
                                                    </a>
                                                </TableCell>
                                                <TableCell>{link.clicks_count}</TableCell>
                                                <TableCell>{formatDate(link.created_at)}</TableCell>
                                                <TableCell className="text-right space-x-2">
                                                    <Button size="sm" variant="ghost" onClick={() => handleCopy(link.unique_code)}><Copy className="h-4 w-4" /></Button>
                                                    <Dialog open={editLinkOpen.index === index && editLinkOpen.isOpen} onOpenChange={(status) => handleEditLinkOpen(status, index, link)}>
                                                        <DialogTrigger asChild>
                                                            <Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Edit a Short Link</DialogTitle>
                                                            </DialogHeader>
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <Label htmlFor="url">Original URL</Label>
                                                                    <Input
                                                                        id="url"
                                                                        placeholder="https://example.com"
                                                                        value={editData.originalUrl}
                                                                        onChange={(e) => setEditData("originalUrl", e.target.value)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="customShortCode">Short Code</Label>
                                                                    <Input
                                                                        id="customShortCode"
                                                                        placeholder="XXXXXX"
                                                                        value={editData.customShortCode}
                                                                        onChange={(e) => setEditData("customShortCode", e.target.value)}
                                                                    />
                                                                </div>
                                                                <Button disabled={editProcessing} onClick={handleEdit}>{editProcessing ? "Saving..." : "Save"}</Button>
                                                            </div>

                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(link.id)}><Trash className="h-4 w-4" /></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div >
            </main >


            <AnimatePresence>
                {(showAlert) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.2 }}
                        className="fixed bottom-4 right-4"
                    >
                        {(createErrors.originalUrl || createErrors.customShortCode || editErrors.originalUrl || editErrors.customShortCode) ? (
                            <Alert className="bg-red-100 border-red-400 text-red-800 [&>svg]:text-red-800">
                                <CircleAlert className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {createErrors.originalUrl && <div>{createErrors.originalUrl}</div>}
                                    {createErrors.customShortCode && <div>{createErrors.customShortCode}</div>}
                                    {editErrors.originalUrl && <div>{editErrors.originalUrl}</div>}
                                    {editErrors.customShortCode && <div>{editErrors.customShortCode}</div>}
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <Alert className="bg-green-100 border-green-400 text-green-800 [&>svg]:text-green-800">
                                <Check className="h-4 w-4" />
                                <AlertTitle>Success!</AlertTitle>
                                <AlertDescription>{alertMessage}</AlertDescription>
                            </Alert>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}

