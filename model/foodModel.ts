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
        required: true,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    image: {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    sizes: [{
        type: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        price: {
            type: Number,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId, // mesmo tipo do _id do produto
            required: true
        }
    }]
}, { timestamps: true })


menuSchema.pre('save', function (next) {
    console.log(this)

    next()
})


export default mongoose.models.Menu || mongoose.model<Cardapio>('Menu', menuSchema)