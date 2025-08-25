import { SharedData } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "./button";
import { LogOut } from "lucide-react";

export default function Navbar({ location }: { location: string }) {
    const { auth } = usePage<SharedData>().props;
    const { post } = useForm();

    const handleLogout = () => {
        post(route('logout'));
    };

    return <header className='p-9 py-4 font-bold'>
        <nav className='w-full h-full flex items-center justify-between'>
            <h1 className='text-xl'>Linkify</h1>
            <ul className='flex gap-5'>
                {!auth.user ? (
                    <>
                        <li>
                            <Link href={route('login')}>
                                <Button variant={"outline"}>Log in</Button>
                            </Link>
                        </li>
                        <li>
                            <Link href={route('register')}>
                                <Button>Sign up</Button>
                            </Link>
                        </li>
                    </>
                ) : location === 'home' ?
                    (
                        <>
                            <li><Link href={route('dashboard')}><Button>Dashboard</Button></Link></li>
                            <li><Button onClick={handleLogout}><LogOut /></Button></li>
                        </>
                    ) : (

                        <li><Link href={route('dashboard')}><Button>Dashboard</Button></Link></li>
                    )}
            </ul>
        </nav>
    </header>
}
