import mongoose from "mongoose";


const url = process.env.DB_CONNECTION || ''

if (!url) {
    throw new Error('Por favor, defina a variável MONGODB_URI no .env.local');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

// let isConnected = false;

export async function dbConnect() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        await mongoose.connect(url, {
            bufferCommands: false,
        }).then(m => m);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

(global as any).mongoose = cached;