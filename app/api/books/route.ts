
import books from "../db";
import { getPostHogClient } from "@/lib/posthog-server";

export async function GET() {
    return Response.json(books)
}

export async function POST(request: Request) {
    const data = await request.json();
    books.push(data);

    const posthog = getPostHogClient();
    posthog.capture({
        distinctId: "anonymous",
        event: "book_added",
        properties: {
            title: data.title,
            author: data.author,
            year: data.year,
        },
    });
    await posthog.shutdown();
}