import { Router } from "express";
import { messagesModel } from "../Dao/models/messages.model.js";

const router = Router();

router.get('/', (req, res) => {
    res.render('chat');
})

export default router;