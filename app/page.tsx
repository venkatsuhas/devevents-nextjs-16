import React from 'react'
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { events } from "@/lib/constants";

const Home = () => {
    return (
        <section id="home">
            <h1 className="text-center">The Hub for Every Dev <br/> Event You Can&#39;t Miss</h1>
            <p className="subheading">Hackathons, Meetups, and Conferences, All in One Place</p>

            <ExploreBtn />

            <div className="mt-20">
                <h2 className="text-3xl font-bold mb-10">Upcoming Events</h2>
                <div className="events">
                    {events.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Home
