import {connectToDatabase} from "./mongodb";
import Event from '@/database/event.model'

export async function getEvents() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    try{
        await connectToDatabase();
        const events = await Event.find().sort({createdAt: -1}).lean();
        return { events}
    }catch(e){
        return { error: []}
    }
}