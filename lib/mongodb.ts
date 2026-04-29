import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // Allows reuse of the same cached connection across hot reloads in development.
    var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
    conn: null,
    promise: null,
};

global.mongooseCache = cached;

/**
 * Connect to MongoDB using Mongoose.
 * Caches the connection/promise to avoid creating multiple connections during HMR.
 */
export async function connectToDatabase(): Promise<typeof mongoose> {

    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {

        if (!MONGODB_URI) {
            throw new Error('Please define the MONGODB_URI environment variable.');
        }
        cached.promise = mongoose.connect(MONGODB_URI as string, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        // Reset the cached promise if connection fails so future retries can occur.
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}
