import mongoose from "mongoose";

const cartsCollection = 'carts';
const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                products: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
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