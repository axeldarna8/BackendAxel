import { Router } from "express";
import { handlePolicies } from "../utils.js";

const router = Router();

router.get('/', handlePolicies("USER"), (req, res) => {
    res.render('chat');
})

export default router;