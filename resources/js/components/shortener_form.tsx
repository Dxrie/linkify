import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2, X } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

interface Status {
    message: string;
    error: boolean;
    shortUrl?: string;
}

export default function ShortenerForm() {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<Status>({ message: "", error: false });
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const { auth } = usePage().props;
    const user = auth.user;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (user) {
            return router.get('/dashboard');
        }

        setLoading(true);
        setCopied(false);

        try {

            const token = document.querySelector<HTMLMetaElement>(
                'meta[name="csrf-token"]'
            )?.content;

            const response = await fetch("/guest/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token || ""
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            setStatus({
                error: !response.ok,
                message: data.message,
                shortUrl: data.shortened_url,
            });

            if (response.ok) setShowDialog(true);
        } catch (err) {
            setStatus({
                error: true,
                message: "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async () => {
        if (status.shortUrl) {
            await navigator.clipboard.writeText(status.shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 w-[95%] sm:w-[80%] md:w-[60%] mx-auto bg-background text-foreground rounded-xl py-6 px-4 sm:px-8 mt-8 relative z-50"
            >
                <div className="flex flex-col gap-4">
                    <p className="text-lg sm:text-xl font-bold text-center">
                        Simplify your Links
                    </p>
                    <Input
                        className="py-4 sm:py-5"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        type="url"
                        placeholder="https://google.com/"
                    />
                    {status.message && (
                        <p
                            className={`text-sm text-center ${status.error ? "text-red-500" : "text-green-500"
                                }`}
                        >
                            {status.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-accent text-accent-foreground hover:bg-accent/80 rounded-xl py-5 text-base"
                >
                    {loading ? "Shortening..." : "Simplify URL"}
                </Button>
            </form>

            <AnimatePresence>
                {showDialog && status.shortUrl && !status.error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 flex items-center justify-center z-50"
                    >
                        <div className="absolute inset-0 bg-black/50" onClick={() => setShowDialog(false)} />
                        <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-sm md:max-w-md w-full z-10">
                            <button
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                onClick={() => setShowDialog(false)}
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h3 className="text-lg text-accent-foreground font-bold mb-2">URL Shortened!</h3>
                            <p className="text-sm text-accent-foreground mb-4">
                                Your short link is ready. Click to visit or copy it!
                            </p>

                            <div className="flex items-center justify-between bg-white border rounded-lg p-3">
                                <Link
                                    href={status.shortUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono underline text-sm text-blue-700 truncate max-w-[70%]"
                                >
                                    {status.shortUrl}
                                </Link>
                                <Button type="button" variant="ghost" size="icon" onClick={copyToClipboard}>
                                    {copied ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Copy className="w-5 h-5 text-gray-500" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

