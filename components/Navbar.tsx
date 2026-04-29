import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    return (
        <header>
            <nav>
                <Link href="/" className="logo">
                    <Image src="/favicon.ico" alt="Dev Event Logo" width={32} height={32}/>
                    <p>Dev Event</p>
                </Link>
                <ul>
                    <Link href="/">Home</Link>
                    <Link href="/events">Events</Link>
                    <Link href="/create-event">Create Event</Link>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
