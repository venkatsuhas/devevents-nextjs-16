
import books from "../db";

export async function GET() {
    return Response.json(books)
}

export async function POST(request: Request) {
    const data = await request.json();
    books.push(data);
    return Response.json({ success: true });
}