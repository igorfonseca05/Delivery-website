import mongoose from "mongoose";

export interface Cardapio extends mongoose.Document {
    category: string,
    name: string,
    description: string,
    image: string,
    sizes: [
        {
            type: string,
            price: number,
            id: number
        },
        {
            type: string,
            price: number,
            id: number
        }
    ]
}


const menuSchema = new mongoose.Schema<Cardapio>({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true

    },
    sizes: [{
        type: { type: String, required: true },
        price: { type: Number, required: false },
    }]
}, { timestamps: true })


export default mongoose.models.Menu || mongoose.model<Cardapio>('Menu', menuSchema)