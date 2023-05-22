import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/register', async (req, res) =>{
    res.render('session/register', {})
})

router.post('/register',  passport.authenticate('register' , {failureRedirect: '/api/sessions/failedregister'}),async (req, res) =>{
    res.redirect('/api/sessions/login');
})

router.get('/failedregister', async (req, res) =>{
    const error = 'Usuario ya existente';
    return res.status(400).render('session/register', {error})
})

router.get('/login', async (req, res) =>{
    res.render('session/login', {})
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/failedlogin'}) ,async (req, res) =>{
    req.session.user = req.user
    if (!req.user) {
        const error = 'Usuario no encontrado'
        return res.status(401).render('session/login', {error})
    }
    res.redirect('/api/products');

})

router.get('/failedlogin', async (req, res) =>{
    const error = 'Contraseña incorrecta'
    return res.status(400).render('session/login', {error})
})

router.get('/login-github', passport.authenticate('github', {scope: ['user: email']}), async (req, res) => {} )

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) => {
    req.session.user = req.user;
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