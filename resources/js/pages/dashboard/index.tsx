
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Home, BarChart3, Link2, Settings } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
    const [active, setActive] = useState("overview")

    return (
        <div className="flex flex-col h-screen w-full bg-gray-50">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
                <div className="flex items-center gap-6">
                    <span className="font-bold text-lg">Linkify</span>
                    <Button
                        variant={active === "overview" ? "default" : "ghost"}
                        onClick={() => setActive("overview")}
                        className="flex items-center gap-2"
                    >
                        <Home className="h-4 w-4" /> Overview
                    </Button>
                    <Button
                        variant={active === "links" ? "default" : "ghost"}
                        onClick={() => setActive("links")}
                        className="flex items-center gap-2"
                    >
                        <Link2 className="h-4 w-4" /> My Links
                    </Button>
                    <Button
                        variant={active === "analytics" ? "default" : "ghost"}
                        onClick={() => setActive("analytics")}
                        className="flex items-center gap-2"
                    >
                        <BarChart3 className="h-4 w-4" /> Analytics
                    </Button>
                    <Button
                        variant={active === "settings" ? "default" : "ghost"}
                        onClick={() => setActive("settings")}
                        className="flex items-center gap-2"
                    >
                        <Settings className="h-4 w-4" /> Settings
                    </Button>
                </div>
                <div className="flex items-center gap-4">
                    {/* Example: user profile section */}
                    <span className="text-sm text-gray-600">Hello, User</span>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {active === "overview" && (
                        <Card className="shadow-md">
                            <CardContent className="p-6">
                                <h1 className="text-xl font-semibold mb-2">Welcome to Linkify 🚀</h1>
                                <p className="text-gray-600">Your personalized URL shortener dashboard.</p>
                            </CardContent>
                        </Card>
                    )}

                    {active === "links" && (
                        <Card className="shadow-md">
                            <CardContent className="p-6">
                                <h1 className="text-xl font-semibold mb-2">My Links</h1>
                                <p className="text-gray-600">Here you can manage and create your shortened links.</p>
                            </CardContent>
                        </Card>
                    )}

                    {active === "analytics" && (
                        <Card className="shadow-md">
                            <CardContent className="p-6">
                                <h1 className="text-xl font-semibold mb-2">Analytics</h1>
                                <p className="text-gray-600">Track clicks, referrers, and more.</p>
                            </CardContent>
                        </Card>
                    )}

                    {active === "settings" && (
                        <Card className="shadow-md">
                            <CardContent className="p-6">
                                <h1 className="text-xl font-semibold mb-2">Settings</h1>
                                <p className="text-gray-600">Manage your profile, API keys, and preferences.</p>
                            </CardContent>
                        </Card>
                    )}
                </motion.div>
            </main>
        </div>
    )
}

