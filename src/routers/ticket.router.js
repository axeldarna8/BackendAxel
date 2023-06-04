import { Router } from "express";
import TicketController from "../Dao/controllers/ticket.controller.js";

const router = Router();
const ticketController = new TicketController()

router.post('/', ticketController.createTicket)

export default router;