interface IBook {
    id: number | string;
    title: string;
    author: string;
    year: number | string;
}

import books from "@/app/api/db";

async function Books() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Books</h1>
            <ul className="space-y-4">
                {books.map((book: IBook) => (
                    <li key={book.id} className="border p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold">{book.title}</h2>
                        <p className="text-gray-600">by {book.author}</p>
                        <p className="text-sm text-gray-400">Published: {book.year}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Books;