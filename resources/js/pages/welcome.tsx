import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <header className='p-9 py-4 font-bold'>
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
                        ) : (
                            <li><Link href={route('dashboard')}><Button>Dashboard</Button></Link></li>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
}
