'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const CreateEvent = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setLoading(true);
        setMessage('');

        const formData = new FormData(form);
        const data: any = Object.fromEntries(formData.entries());
        
        // Parse comma-separated strings into arrays
        if (data.agenda && typeof data.agenda === 'string') {
            data.agenda = data.agenda.split('\n').filter((item: string) => item.trim() !== '');
        }
        if (data.tags && typeof data.tags === 'string') {
            data.tags = data.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '');
        }

        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Event created successfully!');
                form.reset();
                setTimeout(() => router.push('/'), 2000);
            } else {
                setMessage(`Error: ${result.message || result.error || 'Unknown server error'}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(`An error occurred: ${error instanceof Error ? error.message : 'Please try again.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="create-event" className="py-10">
            <h1 className="text-center text-4xl font-bold mb-4">Create a New Event</h1>
            <p className="subheading text-center mb-10">Share your hackathon, meetup, or conference with the community</p>
            
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                            Event Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 dark:text-white"
                            placeholder="e.g. React Node 2026"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                            Short Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 dark:text-white"
                            placeholder="Brief catchy description"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="overview" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                            Detailed Overview
                        </label>
                        <textarea
                            id="overview"
                            name="overview"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 dark:text-white"
                            rows={4}
                            placeholder="Detailed information about the event"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                                Time (HH:MM)
                            </label>
                            <input
                                type="text"
                                id="time"
                                name="time"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 dark:text-white"
                                placeholder="08:30"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="mode" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                            Mode
                        </label>
                        <select
                            id="mode"
                            name="mode"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 dark:text-white"
                            required
                        >
                            <option value="online" className="text-gray-900">Online</option>
                            <option value="offline" className="text-gray-900">Offline</option>
                            <option value="hybrid" className="text-gray-900">Hybrid</option>
                            <option value="Hybrid (In-Person & Online)" className="text-gray-900">Hybrid (In-Person & Online)</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="venue" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                            Venue
                        </label>
                        <input
                            type="text"
                            id="venue"
                            name="venue"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 dark:text-white"
                            placeholder="e.g. Moscone Center"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="location" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                            Location (City, State/Country)
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 dark:text-white"
                            placeholder="e.g. San Francisco, CA"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="image" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                            Image URL
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 dark:text-white"
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="organizer" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                            Organizer
                        </label>
                        <input
                            type="text"
                            id="organizer"
                            name="organizer"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 dark:text-white"
                            placeholder="Who is organizing this?"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="audience" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                            Target Audience
                        </label>
                        <input
                            type="text"
                            id="audience"
                            name="audience"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 dark:text-white"
                            placeholder="e.g. Developers, AI researchers"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="agenda" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                            Agenda (One item per line)
                        </label>
                        <textarea
                            id="agenda"
                            name="agenda"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 dark:text-white"
                            rows={5}
                            placeholder="08:30 AM - Keynote&#10;10:00 AM - Workshop"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="tags" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                            Tags (Comma separated)
                        </label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-900 dark:text-white"
                            placeholder="Cloud, DevOps, AI"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Event'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default CreateEvent
