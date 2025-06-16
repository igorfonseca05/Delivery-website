import mongoose from "mongoose";

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


const menuSchema = new mongoose.Schema({
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
    sizes: {
        type: [sizeSchema],
        required: true
    }
}, { timestamps: true })


// Exemplo: hook que você quer ativar
menuSchema.pre('save', function (next) {
    const productId = this._id
    this.sizes = this.sizes.map(size => ({
        ...size,
        id: productId
    }))
    next()
})

export default mongoose.models.Menu || mongoose.model('Menu', menuSchema)
