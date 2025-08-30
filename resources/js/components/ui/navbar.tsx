
import { Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "./button";
import { LogOut, Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Navbar() {
    const { auth } = usePage().props;
    const { post } = useForm();
    const user = auth.user;

    const handleLogout = () => {
        post(route("logout"));
    };

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
                    {!user ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <Link href={route("dashboard")}>
                                <Button
                                    className="text-lg py-7 hover:bg-accent/70 dark:hover:bg-accent/70"
                                    variant="ghost"
                                >
                                    Dashboard
                                </Button>
                            </Link>

                            {/* Logout with confirmation */}
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        className="text-lg py-7 hover:bg-accent/70 dark:hover:bg-accent/70"
                                        variant="ghost"
                                    >
                                        <LogOut />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to log out? You’ll need to log in
                                            again to access your account.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleLogout}>
                                            Logout
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    )}
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
                            {!user ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    <Link href={route("dashboard")}>
                                        <Button
                                            className="w-full text-lg py-6 hover:bg-accent/70 dark:hover:bg-accent/70"
                                            variant="ghost"
                                        >
                                            Dashboard
                                        </Button>
                                    </Link>

                                    {/* Mobile logout with confirmation */}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                className="w-full text-lg py-6 hover:bg-accent/70 dark:hover:bg-accent/70"
                                                variant="ghost"
                                            >
                                                <LogOut className="mr-2" /> Logout
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to log out?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleLogout}>
                                                    Logout
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}

