import { Button } from "@/components/ui/button";
import { Link, router, usePage } from "@inertiajs/react";
import { BarChart3, Home, Link2, Tag } from "lucide-react";
import { a } from "node_modules/framer-motion/dist/types.d-Cjd591yU";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { auth } = usePage().props;
    const user = auth.user;

    const [active, setActive] = useState<string>('overview');
    const handleTabChange = (tab: string) => {
        setActive(tab);

        switch (tab) {
            case 'overview':
                router.visit(route('dashboard.overview'));
                break;
            case 'links':
                router.visit(route('dashboard.links'));
                break;
            case 'prefixes':
                router.visit(route('dashboard.prefixes'));
                break;
            case 'analytics':
                router.visit(route('dashboard.analytics'));
                break;
        }
    };

    useEffect(() => {
        const pathName = window.location.pathname;

        switch (pathName) {
            case '/dashboard':
                setActive('overview');
                break;
            case '/dashboard/overview':
                setActive('overview');
                break;
            case '/dashboard/links':
                setActive('links');
                break;
            case '/dashboard/prefixes':
                setActive('prefixes');
                break;
            case '/dashboard/analytics':
                setActive('analytics');
                break;
        }
    }, []);

    return <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
        <div className="flex items-center gap-6">
            <Link href={route("home")} className="font-bold text-lg">Linkify</Link>
            <Button
                variant={active === "overview" ? "default" : "ghost"}
                onClick={() => handleTabChange("overview")}
                className="flex items-center gap-2"
            >
                <Home className="h-4 w-4" /> Overview
            </Button>
            <Button
                variant={active === "links" ? "default" : "ghost"}
                onClick={() => handleTabChange("links")}
                className="flex items-center gap-2"
            >
                <Link2 className="h-4 w-4" /> My Links
            </Button>
            <Button
                variant={active === "prefixes" ? "default" : "ghost"}
                onClick={() => handleTabChange("prefixes")}
                className="flex items-center gap-2"
            >
                <Tag className="h-4 w-4" /> Prefixes
            </Button>
            <Button
                variant={active === "analytics" ? "default" : "ghost"}
                onClick={() => handleTabChange("analytics")}
                className="flex items-center gap-2"
            >
                <BarChart3 className="h-4 w-4" /> Analytics
            </Button>
        </div>
        <div className="flex items-center gap-4">
            {/* Example: user profile section */}
            <span className="text-sm text-gray-600">Hello, {user?.name}</span>
        </div>
    </nav>;
}
