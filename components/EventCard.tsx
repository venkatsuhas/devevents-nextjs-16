'use client'
import React, { useState } from 'react';
import Image from 'next/image';

interface EventProps {
    _id?: string;
    id?: number | string;
    title: string;
    description: string;
    image?: string;
    poster?: string;
    date: string;
    time: string;
    location: string;
}

const EventCard = ({ title, description, poster, image, date, time, location }: EventProps) => {
    const [imgSrc, setImgSrc] = useState(image || poster || "/images/event1.png");

    const handleImageError = () => {
        // Fallback to local images if remote fetch fails
        setImgSrc("/images/event1.png");
    };

    return (
        <div id="event-card">
            <div className="poster-container">
                <Image 
                    src={imgSrc} 
                    alt={title} 
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="poster"
                    onError={handleImageError}
                />
            </div>
            
            <h3 className="title">{title}</h3>
            
            <div className="datetime">
                <div>
                    <Image src="/icons/calendar.svg" alt="calendar" width={16} height={16} style={{ width: 'auto', height: 'auto' }} className="icon-image" />
                    <span>{date}</span>
                </div>
                <div>
                    <Image src="/icons/clock.svg" alt="clock" width={16} height={16} style={{ width: 'auto', height: 'auto' }} className="icon-image" />
                    <span>{time}</span>
                </div>
                <div>
                    <Image src="/icons/pin.svg" alt="location" width={16} height={16} style={{ width: 'auto', height: 'auto' }} className="icon-image" />
                    <span>{location}</span>
                </div>
            </div>

            <p>{description}</p>
        </div>
    );
};

export default EventCard;
