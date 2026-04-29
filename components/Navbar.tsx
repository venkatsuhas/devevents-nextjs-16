'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import posthog from 'posthog-js';

const Navbar = () => {
    const handleNavClick = (label: string, href: string) => {
        posthog.capture("nav_link_clicked", { label, href });
    };

    return (
        <header>
            <nav>
                <Link href="/" className="logo" onClick={() => handleNavClick("logo", "/")}>
                    <Image src="/favicon.ico" alt="Dev Event Logo" width={32} height={32}/>
                    <p>Dev Event</p>
                </Link>
                <ul>
                    <Link href="/" onClick={() => handleNavClick("Home", "/")}>Home</Link>
                    <Link href="/events" onClick={() => handleNavClick("Events", "/events")}>Events</Link>
                    <Link href="/create-event" onClick={() => handleNavClick("Create Event", "/create-event")}>Create Event</Link>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
