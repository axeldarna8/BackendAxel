import TicketManager from "../managers/TicketManager.js";

const ticket = new TicketManager();

class TicketController {

    createTicket = async (user, products) => {
		const amount = products.reduce((acum, product) => acum + product.price*product.quantity, 0);
		const purchaser = user.email;
		const code = 0;
		return await ticket.createTicket(purchaser, code, products, amount);
	}

}

export default TicketController;