import {NextRequest,NextResponse} from 'next/server';
import {connectToDatabase} from "../../../lib/mongodb";
import Event from '@/database/event.model'
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest){
    try{
        await connectToDatabase();
        
        const contentType = req.headers.get('content-type') || '';
        let eventData: any;

        if (contentType.includes('application/json')) {
            eventData = await req.json();
        } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
            const formData = await req.formData();
            eventData = Object.fromEntries(formData.entries());
        } else {
            return NextResponse.json({ message: 'Unsupported content type' }, { status: 400 });
        }

        // Parse agenda and tags if they are strings (from Form Data)
        if (typeof eventData.agenda === 'string') {
            try {
                eventData.agenda = JSON.parse(eventData.agenda);
            } catch (e) {
                // Keep as is or handle if it's supposed to be an array
            }
        }
        if (typeof eventData.tags === 'string') {
            try {
                eventData.tags = JSON.parse(eventData.tags);
            } catch (e) {
                // Keep as is
            }
        }

        let createdEvent;
        try {
            // console.log('Attempting to create event with slug:', eventData.slug || 'auto-generated');
            createdEvent = await Event.create(eventData);
            revalidateTag('events', createdEvent);
        } catch (e: any) {
            // console.log('Initial create failed, error code:', e.code);
            // Handle MongoDB duplicate key error (code 11000)
            if (e.code === 11000) {
                const baseSlug = eventData.slug || eventData.title
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-');
                
                let slug = baseSlug;
                let counter = 1;
                let success = false;
                
                // Retry with incremented slug (max 10 attempts)
                while (counter <= 10) {
                    slug = `${baseSlug}-${counter}`;
                    // console.log(`Retrying with slug: ${slug} (attempt ${counter})`);
                    try {
                        const newEventData = { ...eventData, slug };
                        // Use insertMany or similar to bypass some pre-save hooks if needed, 
                        // but here we just want a fresh creation.
                        createdEvent = await Event.create(newEventData);
                        success = true;
                        // console.log('Retry successful!');
                        break;
                    } catch (retryError: any) {
                        // console.log(`Retry failed with code: ${retryError.code}`);
                        if (retryError.code === 11000) {
                            counter++;
                        } else {
                            throw retryError;
                        }
                    }
                }
                
                if (!success) {
                    throw e; // Throw original error if retries failed
                }
            } else {
                throw e;
            }
        }

        return NextResponse.json(
            {message: 'Event created', event: createdEvent},
            {status: 201}
        )
    }catch(e: any){
        console.error('Error in POST /api/events:', e);
        
        if (e.code === 11000) {
            return NextResponse.json({
                message: 'Duplicate key error',
                error: `A duplicate value was found for: ${JSON.stringify(e.keyValue)}`
            }, { status: 409 });
        }

        return NextResponse.json({
            message: 'Event not created',
            error: e instanceof Error ? e.message : 'Unknown error'
        },{status: 500})
    }
}

export async function GET(){
    try{
        await connectToDatabase();
        const events = await Event.find().sort({createdAt: -1});
        return NextResponse.json({message: 'Events fetched', events}, {status: 200});
    }catch(e){
        console.error('Error in GET /api/events:', e);
        return NextResponse.json({message: 'Events not fetched', error: e instanceof Error ? e.message : 'Unknown error'}, {status: 500});
    }
}