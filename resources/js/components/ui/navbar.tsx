import { Link } from "@inertiajs/react";
import { Button } from "./button";

export default function Navbar() {
    return <div className="w-[95%] text-foreground flex items-center justify-between bg-background fixed top-5 left-1/2 -translate-x-1/2 rounded-xl py-5 px-6">
        <div className="flex gap-2 items-center">
            <img draggable={false} width={35} src="./logo.png" />
            <h1 className="text-3xl font-bold">Linkify</h1>
        </div>

    <div className="flex items-center gap-5">
            <div className="flex item-center gap-7">
                <Link href={route('home')} className="text-lg font-bold">Home</Link>
                <Link href={route('about')} className="text-lg">About</Link>
            </div>
            <div className="flex items-center gap-2">
                <Link href={route('login')}>
                    <Button className="text-lg py-7 hover:bg-accent/70 dark:hover:bg-accent/70" variant={"ghost"}>Log in</Button>
                </Link>
                <Link href={route('register')}>
                    <Button className="text-lg py-7 bg-accent text-accent-foreground hover:bg-accent/70">Sign up free</Button>
                </Link>
            </div>
        </div>
    </div>
}
