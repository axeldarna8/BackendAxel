import mongoose from "mongoose";

const userCollection = 'users';
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email:{ 
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    cart:{
        type: [
            {
                carts: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "carts"
                }
            }
        ]
    },
    role:{
        type: String,
        detault: 'user'
    }
})

export const userModel = mongoose.model(userCollection, userSchema);