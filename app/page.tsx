import React, { Suspense } from 'react'
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {cacheLife} from "next/cache";
import { cacheTag } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const EventsList = async () => {
    'use cache';
    cacheLife('hours')
    cacheTag('events');
    const res = await fetch(`${BASE_URL}/api/events`, { cache: 'no-store' })
    const {events} = await res.json()
    
    if (!events || events.length === 0) return <p>No events found.</p>;

    return (
        <div className="events">
            {events.map((event: any) => (
                <EventCard key={event._id || event.id} {...event} />
            ))}
        </div>
    )
}

const Home = async() => {
    return (
        <section id="home">
            <h1 className="text-center">The Hub for Every Dev <br/> Event You Can&#39;t Miss</h1>
            <p className="subheading">Hackathons, Meetups, and Conferences, All in One Place</p>

            <ExploreBtn />

            <div className="mt-20">
                <h2 className="text-3xl font-bold mb-10">Upcoming Events</h2>
                <Suspense fallback={<p>Loading events...</p>}>
                    <EventsList />
                </Suspense>
            </div>
        </section>
    )
}
export default Home
