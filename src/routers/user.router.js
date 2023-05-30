import { Router } from "express";
import UserController from "../Dao/controllers/user.controller.js";
import { handlePolicies } from "../utils.js";


const userController = new UserController()


const router = Router();

router.get('/', handlePolicies("USER","ADMIN"), userController.getAllUsersDB)

router.get('/current',)


export default router;