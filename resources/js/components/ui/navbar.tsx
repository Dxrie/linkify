import { Link } from "@inertiajs/react";
import { Button } from "./button";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
    return (
        <div className="w-[95%] text-foreground flex items-center justify-between bg-background fixed top-5 left-1/2 -translate-x-1/2 rounded-xl py-3 px-6">
            {/* Logo */}
            <div className="flex gap-2 items-center">
                <img
                    draggable={false}
                    src="./logo.png"
                    className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10"
                />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Linkify</h1>
            </div>

            {/* Menu */}
            <div className="hidden md:flex items-center gap-5">
                <div className="flex items-center gap-7">
                    <Link href={route("home")} className="text-lg font-bold">
                        Home
                    </Link>
                    <Link href={route("about")} className="text-lg">
                        About
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={route("login")}>
                        <Button
                            className="text-lg py-7 hover:bg-accent/70 dark:hover:bg-accent/70"
                            variant="ghost"
                        >
                            Log in
                        </Button>
                    </Link>
                    <Link href={route("register")}>
                        <Button className="text-lg py-7 bg-accent text-accent-foreground hover:bg-accent/70">
                            Sign up free
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Hamburger Menu */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[70%] sm:w-[300px]">
                        <SheetHeader>
                            <SheetTitle className="flex items-center gap-2">
                                <img draggable={false} width={30} src="./logo.png" />
                                <span className="text-xl font-bold">Linkify</span>
                            </SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-col gap-6 mt-8">
                            <Link href={route("home")} className="text-lg font-bold">
                                Home
                            </Link>
                            <Link href={route("about")} className="text-lg">
                                About
                            </Link>
                            <Link href={route("login")}>
                                <Button
                                    className="w-full text-lg py-6 hover:bg-accent/70 dark:hover:bg-accent/70"
                                    variant="ghost"
                                >
                                    Log in
                                </Button>
                            </Link>
                            <Link href={route("register")}>
                                <Button className="w-full text-lg py-6 bg-accent text-accent-foreground hover:bg-accent/70">
                                    Sign up free
                                </Button>
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}

