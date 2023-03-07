import { Router } from "express";
import mongoose from "mongoose";
import { userModel } from "../Dao/models/user.model.js";
import { createHash , isValidPassword } from "../utils.js";

const router = Router();

router.get('/register', async (req, res) =>{
    res.render('session/register', {})
})

router.post('/register', async (req, res) =>{
    const userNew = req.body;
    userNew.password = createHash(userNew.password);

    const userGenerated = new userModel(userNew);
    await userGenerated.save();

    res.redirect('/api/sessions/login');
})

router.get('/login', async (req, res) =>{
    res.render('session/login', {})
})

router.post('/login', async (req, res) =>{
    const {email , password } = req.body;

    const user = await userModel.findOne({email}).lean().exec();

    if (!user) {
        const error = 'Usuario no encontrado'
        return res.status(401).render('session/login', {error})
    }

    if (!isValidPassword (user , password)){
        const error = 'Contraseña incorrecta'
        return res.status(403).render('session/login', {error})
    }

    delete user.password;
    
    req.session.user = user;
    req.session.user.rol = (email == 'adminCoder@coder.com') ? 'admin' : 'user';

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