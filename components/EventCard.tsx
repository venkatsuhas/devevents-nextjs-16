import React from 'react';
import Image from 'next/image';

interface EventProps {
    id: number;
    title: string;
    description: string;
    poster: string;
    date: string;
    time: string;
    location: string;
}

const EventCard = ({ title, description, poster, date, time, location }: EventProps) => {
    return (
        <div id="event-card">
            <div className="poster-container">
                <Image 
                    src={poster} 
                    alt={title} 
                    fill
                    className="poster"
                />
            </div>
            
            <h3 className="title">{title}</h3>
            
            <div className="datetime">
                <div>
                    <Image src="/icons/calendar.svg" alt="calendar" width={16} height={16} className="icon-image" />
                    <span>{date}</span>
                </div>
                <div>
                    <Image src="/icons/clock.svg" alt="clock" width={16} height={16} className="icon-image" />
                    <span>{time}</span>
                </div>
                <div>
                    <Image src="/icons/pin.svg" alt="location" width={16} height={16} className="icon-image" />
                    <span>{location}</span>
                </div>
            </div>

            <p>{description}</p>
        </div>
    );
};

export default EventCard;
