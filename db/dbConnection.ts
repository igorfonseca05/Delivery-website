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



// // criando variavel global com nome mongoose
// declare global {
//     var mongoose: any // Use sempre var
// }

// // Obtendo o valor da variavel global
// let cached = global.mongoose

// // Verificando se existe algum valor armazenado nela
// // se não tiver, zera ela.
// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null }
// }

// async function dbConnect() {
//     const urlConnection = process.env.DB_CONNECTION

//     if (!urlConnection) {
//         throw new Error('Por favor, defina uma variavel de conexão com a base de dados')
//     }

//     if (cached.conn) {
//         return cached.conn;
//     }

//     if (!cached.promise) {
//         const opts = {
//             bufferCommands: false
//         };

//         cached.promise = mongoose.connect(urlConnection, opts)
//             .then((mongoose) => {
//                 return mongoose
//             })
//     }

//     try {
//         cached.conn = await cached.promise
//     } catch (error) {
//         cached.promise = null;
//         throw error;
//     }

//     return cached.conn
// }

// export default dbConnect