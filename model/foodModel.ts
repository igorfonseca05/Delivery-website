import mongoose from "mongoose";

export interface Cardapio extends mongoose.Document {
    category: string,
    name: string,
    description: string,
    image: string,
    sizes: {
        type: string,
        price: number
    }[]
}

const sizeSchema = new mongoose.Schema({
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
        // required: true
    }
}, { _id: false })


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
    },
    sizes: {
        type: [sizeSchema],
        required: true
    }
}, { timestamps: true })


menuSchema.pre('save', function (next) {
    const id = this._id

    this.sizes = this.sizes.map(item => ({
        ...item || item,
        id
    }))

    next()
})


export default mongoose.models.cardapio || mongoose.model<Cardapio>('cardapio', menuSchema)