import { Router } from "express";
import UserController from "../Dao/controllers/user.controller.js";
import { handlePolicies } from "../utils.js";
import nodemailer from "nodemailer";


const userController = new UserController()


const router = Router();

router.get('/', handlePolicies("USER","ADMIN"), userController.getAllUsersDB)

router.get('/current',)

router.get('/premium/:uid', )

router.delete('/', handlePolicies("ADMIN"), userController.deleteUserDB)

export default router;