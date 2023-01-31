import mongoose from "mongoose";

const cartsCollection = 'carts';
const cartsSchema = new mongoose.Schema({
    cid: Number,
    products: {
        type: [
            {
                products: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product"
                },
                qty: Number
            }
        ], 
        default: []
    }
})

cartsSchema.pre('find', function (){
    this.populate('products.products')
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);