import mongoose from "mongoose";

const ticketCollection = 'tickets'
const ticketSchema = mongoose.Schema({
	purchaser: String,
	amount: Number,
	code: {
		type: String,
		unique: true
	},
}, {
	timestamps: { 
		createdAt: 'purchase_datatime', 
		updatedAt: false 
	}});

export const ticketModel =  mongoose.model(ticketCollection, ticketSchema);