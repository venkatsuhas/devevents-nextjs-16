export async function getEvents() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    try{
        const res = await fetch(`${BASE_URL}/api/events`)
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }
        return await res.json()
    }catch(e){
        return []
    }
}