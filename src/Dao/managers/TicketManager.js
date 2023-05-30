import { ticketModel } from "../models/ticket.model.js";

class TicketManager {

    createTicket = async (purchaser, code, products, amount) => {
		return await ticketModel.create({purchaser,code,products,amount})
	}
}

export default TicketManager;