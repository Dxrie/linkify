import { useState } from "react";
import { ChartColumn, Hash, LayoutDashboard, Link2, LogOut, Menu } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div
            className={`flex flex-col p-4 bg-primary h-screen transition-all duration-300 ${
                collapsed ? "w-20" : "w-[calc(15%+2rem)]"
            }`}
        >
            {/* Header: Logo & Toggle */}
            <div className="flex items-center justify-between">
                {/* Logo hanya tampil jika tidak collapse */}
                {!collapsed && (
                    <div className="flex gap-3 items-center">
                        <img
                            draggable={false}
                            className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10"
                            src="logo.png"
                        />
                        <h1 className="text-white font-bold text-xl sm:text-2xl md:text-3xl">
                            Linkify
                        </h1>
                    </div>
                )}

                {/* Tombol toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-white/20 transition-colors ml-auto"
                >
                    <Menu className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Menu */}
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col pt-10 gap-5">
                    <div className="flex items-center gap-4 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors">
                        <LayoutDashboard className="w-6 h-6 text-white" />
                        {!collapsed && (
                            <Link href="/" className="text-white text-1xl">
                                Dashboard
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center gap-4 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors">
                        <Link2 className="w-6 h-6 text-white" />
                        {!collapsed && (
                            <Link href={route("dashboard.links")} className="text-white text-1xl">
                                Links
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center gap-4 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors">
                        <Hash className="w-6 h-6 text-white" />
                        {!collapsed && (
                            <Link href="/" className="text-white text-1xl">
                                Prefixes
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center gap-4 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors">
                        <ChartColumn className="w-6 h-6 text-white" />
                        {!collapsed && (
                            <Link href="/" className="text-white text-1xl">
                                Analytics
                            </Link>
                        )}
                    </div>
                </div>

                {/* Logout */}
                <div className="flex items-center gap-4 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors">
                    <LogOut className="w-6 h-6 text-white" />
                    {!collapsed && (
                        <Link href="/logout" className="text-white text-1xl">
                            Logout
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
