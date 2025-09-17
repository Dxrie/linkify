import { useState, useEffect } from "react";
import { Home, BarChart3, Link2, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Overview from "./overview";
import { Link } from "@inertiajs/react";
import MyLinks from "./links";
import Analytics from "./analytics";
import Prefixes from "./prefixes";
import Navbar from "./navbar";

export default function Dashboard() {
    const [active, setActive] = useState("overview");

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace("#", "");
            if (hash) {
                setActive(hash);
            }
        };

        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    const handleTabChange = (tab: string) => {
        setActive(tab);
        window.location.hash = tab;
    };

    return (
        <div className="flex flex-col h-screen w-full bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {active === "overview" && <Overview />}
                    {active === "links" && <MyLinks />}
                    {active === "prefixes" && <Prefixes />}
                    {active === "analytics" && <Analytics />}
                </motion.div>
            </main>
        </div>
    );
}

