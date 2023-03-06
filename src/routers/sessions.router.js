import { Router } from "express";
import mongoose from "mongoose";
import { userModel } from "../Dao/models/user.model.js";

const router = Router();

router.get('/register', async (req, res) =>{
    res.render('session/register', {})
})

router.post('/register', async (req, res) =>{
    const userNew = req.body;

    const userGenerated = new userModel(userNew);
    await userGenerated.save();

    res.redirect('/api/sessions/login');
})

router.get('/login', async (req, res) =>{
    res.render('session/login', {})
})

router.post('/login', async (req, res) =>{
    const {email , password } = req.body;
    let userNotFound = false;

    const user = await userModel.findOne({email, password}).lean().exec();
    if (!user) {
        userNotFound = true;
        const error = 'Email o contraseña no concuerdan'
        return res.status(401).render('session/login', {error})
    }

    req.session.user = user;
    req.session.user.rol = (email == 'adminCoder@coder.com') ? 'admin' : 'user'

    res.redirect('/api/products');

})

router.get('/logout', async (req, res) =>{
    req.session.destroy(err => {
        if(err) {
            console.log(err);
            res.status(500).render('session/login', {error : err})
        } else {
            res.redirect('/api/sessions/login');
        }
    })
})


export default router;