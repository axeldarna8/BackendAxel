import { Router } from "express";
import mongoose from "mongoose";
import { userModel } from "../Dao/models/user.model.js";

const router = Router();

router.get('/register', async (req, res) =>{
    res.render('sessions/register', {})
})

router.post('/create', async (req, res) =>{
    const userNew = req.body;
    console.log(userNew);

    const userGenerated = new userModel(userNew);
    await userGenerated.save();

    res.redirect('sessions/login');
})

router.get('/login', async (req, res) =>{
    res.render('sessions/login', {})
})

router.post('/login', async (req, res) =>{
    const {email , password } = req.body;
    let userNotFound = false;

    const user = await userModel.findOne({email, password}).lean().exec();
    if (!user) {
        userNotFound = true;
        return res.status(401).render('sessions/login', {userNotFound})
    }

    req.session.user = user;

    res.redirect('/api/products');

})


export default router;