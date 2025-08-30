import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import Waves from "@/components/waves";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { Shield, Zap, BarChart3, ArrowRight } from "lucide-react"
import { Link } from "@inertiajs/react";

interface Message {
    message: string;
    error: boolean;
}

function Benefits() {
    return (
        <section className="relative z-10 text-white py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Why choose <span className="text-accent">Linkify</span>?
                </h2>

                <div className="text-black grid gap-6 sm:gap-8 md:grid-cols-3">
                    {/* Card 1 */}
                    <div className="bg-card rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
                        <Shield className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
                        <p className="text-muted-foreground">
                            Protect your links with reliable shortening that prevents tampering and misuse.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-card rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
                        <Zap className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Fast & Simple</h3>
                        <p className="text-muted-foreground">
                            Generate short links in seconds with a smooth, minimal workflow.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-card rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
                        <BarChart3 className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Trackable</h3>
                        <p className="text-muted-foreground">
                            Get insights with click analytics and see how your links perform.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        href={route("register")}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-primary/80 transition"
                    >
                        <span>Start simplifying your links</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

            </div>
        </section>
    );
}

export default function Welcome() {
    const [url, setUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<Message>({
        message: "",
        error: false,
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await fetch("/guest/shorten", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": (document.querySelector(
                        'meta[name="csrf-token"]'
                    ) as HTMLMetaElement).content,
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            setStatus({
                error: response.ok,
                message: data.message,
            });
        } catch {
            setStatus({
                error: true,
                message: "An unknown error occured, please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-dvh bg-gradient-to-br from-primary from-10% via-secondary via-30% to-blue-400 to-90% text-white animate-gradient-x relative">
            <Navbar />

            {/* Hero */}
            <div className="text-center pt-32 sm:pt-40 text-shadow-md px-4">
                <h1 className="text-3xl sm:text-4xl font-bold max-w-2xl mx-auto">
                    Make every link simple
                </h1>
                <h2 className="text-lg sm:text-2xl max-w-2xl mx-auto mt-4 leading-snug">
                    Easily turn long URLs into short, memorable links. Clean, simple, and
                    perfect for sharing anywhere.
                </h2>
            </div>

            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 w-[95%] sm:w-[80%] md:w-[60%] mx-auto bg-background text-foreground rounded-xl py-6 px-4 sm:px-8 mt-8"
            >
                <div className="flex flex-col gap-2">
                    <p className="text-base sm:text-lg font-bold">Simplify your links</p>
                    <Input
                        className="py-4 sm:py-5"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        type="url"
                        placeholder="https://google.com/"
                    />
                    {status.error && (
                        <p className="text-red-500 text-sm">{status.message}</p>
                    )}
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-accent text-accent-foreground hover:bg-accent/60"
                >
                    {loading ? "Shortening URL..." : "Simplify your URL"}
                </Button>
            </form>

            {/* Benefits Section */}
            <Benefits />

            <Waves />
        </div>
    );
}

