import mongoose from "mongoose";

const productCollection = 'products';
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: Number,
    price: Number,
    status: {type: Boolean , default: true},
    stock: Number,
    category: String
})

export const productModel = mongoose.model(productCollection, productSchema);