import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const cartsCollection = 'carts';
const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                qty: {
                    type: Number,
                    default: 1
                }
            }
        ], 
        default: []
    }
})

cartsSchema.plugin(mongoosePaginate);

cartsSchema.pre('find', function (){
    this.populate('products.product')
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);