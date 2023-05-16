import { Router } from "express";
import { generateToken, authToken, passportCall, authorizationCheck } from "../utils.js";
import { userModel } from "../Dao/models/user.model.js";
import passport from "passport";

const router = Router();

router.post('/register', async (req, res) => {
    const user = req.body;
    const foundUser = await userModel.findOne({email: user.email})

    if (foundUser) {
        return res.status(400).send({status: 'error', error: 'user already exist'})
    }
    userModel.create(user);
    const access_token = `Bearer ${generateToken(user)}`;
    res.cookie('codercookie',access_token).send({status:'success', access_token})
})

router.post('/login', async (req, res) => {
    const users = req.body;
    const foundUser = await userModel.findOne( {email: users.email , password: users.password})
    if (!foundUser) {
        return res.status(400).send({status: 'error', error: 'invalid credentials'})
    }
    const access_token = generateToken(users);
    res.cookie('codercookie',access_token).send({status: 'success'});
})

router.get('/current', passportCall('jwt'), authorizationCheck('user'), (req, res) => {
    res.send({status: 'success', payload: req.user}) 
})

router.get('/admin', passportCall('jwt'), authorizationCheck('admin'), (req, res) => {
    res.send({status: 'success', payload: req.user}) 
})


export default router;