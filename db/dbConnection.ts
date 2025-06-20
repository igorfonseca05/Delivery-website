import mongoose from "mongoose";


const url = process.env.NODE_ENV === 'development' && process.env.LOCAL_DB_CONNECTION ||
    process.env.NODE_ENV === 'production' && process.env.DB_CONNECTION || ''


if (!url) {
    throw new Error('Por favor, defina a variável MONGODB_URI no .env');
}

let cached = (global as any).mongoose || { conn: null, promise: null };


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