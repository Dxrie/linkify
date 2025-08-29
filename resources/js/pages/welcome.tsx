import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import Waves from "@/components/waves";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";

export default function Welcome() {
    const [url, setUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await fetch("/guest/shorten", {
                method: "POST",
                headers: { "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content }
            });

            const data = await response.json();
            setStatus(data.message);
        } catch {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-dvh px-10 bg-gradient-to-br from-primary from-10% via-secondary via-30% to-blue-400 to-90% text-white animate-gradient-x relative">
            <Navbar />
            <div className="text-center pt-40 text-shadow-md">
                <h1 className="text-4xl font-bold">Make every link simple</h1>
                <h2 className="text-2xl">Easily turn long URLs into short, memorable links. Clean, simple, and perfect for sharing anywhere.</h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-[60%] m-auto bg-background text-foreground rounded-xl py-6 px-8 mt-8">
                <div className="flex flex-col gap-2">
                    <p className="text-1xl font-bold">Simplify your links</p>
                    <Input className="py-5" value={url} onChange={(e) => setUrl(e.target.value)} type="url" placeholder="https://google.com/" />
                </div>
                <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/60">{loading ? "Shortening URL..." : "Simplify your URL"}</Button>
            </form>

            <Waves />
        </div>

    );
}
