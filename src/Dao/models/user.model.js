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
        default: 'user'
    },
    documents: [
        {
            name: String,
            reference: String
        }
    ],
    last_connection: Date
})

const userDtoSchema = new mongoose.Schema({
    first_name: String,
    email: String,
    role: String,
    cart:{
        type: [
            {
                carts: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "carts"
                }
            }
        ]
    }
});

userSchema.methods.toDto = function() {
    const { first_name, email, role } = this;
    return { first_name, email, role };
};

export const userDtoModel = mongoose.model('userDto', userDtoSchema);
export const userModel = mongoose.model(userCollection, userSchema);