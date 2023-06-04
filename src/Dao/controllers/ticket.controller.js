import TicketManager from "../managers/TicketManager.js";

const ticket = new TicketManager();

class TicketController {

	createTicket = async (req, res) => {
		const min = 1;
		const max = 5000;
		const user = req.session.user;
		const amount = 15;
		const purchaser = user.email;
		const code = Math.floor(Math.random() * (max - min + 1)) + min;
		const ticketFinal = await ticket.createTicket(purchaser, code, amount);
		console.log(ticketFinal.purchaser);
		console.log(ticketFinal.code);
		console.log(ticketFinal.amount);
		res.render('ticket', { purchaser: ticketFinal.purchaser, code: ticketFinal.code, amount: ticketFinal.amount })
	}

}

export default TicketController;