import React from 'react'
import EventCard from "@/components/EventCard"
import { events } from "@/lib/constants"

const Events = () => {
    return (
        <section id="events">
            <h1 className="text-center text-4xl font-bold mb-4">All Events</h1>
            <p className="subheading text-center mb-10">Browse all available hackathons, meetups, and conferences</p>
            
            <div className="events">
                {events.map((event) => (
                    <EventCard key={event.id} {...event} />
                ))}
            </div>
        </section>
    )
}

export default Events
