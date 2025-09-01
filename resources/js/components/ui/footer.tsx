import { Link } from "@inertiajs/react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="flex flex-col w-full bg-background text-foreground p-15 divide-y-2 gap-3">
            <div className="flex w-full gap-12 pb-10">
                <div className="flex flex-col w-1/4 gap-5">
                    <div className="flex flex-col text-muted-foreground">
                        <p className="text-sm">Simplify your links, amplify your reach, Create short, memorable URLs that drive more clicks.</p>
                    </div>
                    <div className="flex items-center gap-5 text-muted-foreground w-1/4">
                        <Github size={20} />
                        <Linkedin size={20} />
                    </div>
                </div>
                <div className="flex flex-col text-muted-foreground w-1/4 gap-2">
                    <Link href="/">Home</Link>
                    <Link href="/">Dashboard</Link>
                    <Link href="/">About</Link>
                </div>
                <div className="flex flex-col text-muted-foreground w-1/4 gap-2">
                    <Link href="/">Privacy Policy</Link>
                    <Link href="/">Terms of Service</Link>
                    <Link href="/">Contact Us</Link>
                </div>
                <div className="flex text-muted-foreground gap-2 w-1/4">
                    <Mail size={20} />
                    <p className="text-sm">support@linkify.com</p>
                </div>
            </div>

            <div className="flex pt-5 justify-between">
                <p className="text-muted-foreground ">© 2025 Linkify. All rights reserved.</p>
                <div className="flex items-center gap-2">
                    <img draggable={false} width={35} src="./logo.png" />
                    <h1 className="text-xl font-normal">Linkify</h1>
                </div>
            </div>
        </footer>
    );
}