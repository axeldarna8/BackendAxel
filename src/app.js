import express from 'express';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import productsRouter from './routers/products.router.js';
import cartRouter from './routers/cart.router.js';
app.use(express.static('public'))

app.use('/api/products' , productsRouter);
app.use('/api/carts' , cartRouter);
app.use('/' , (req,res) => res.send('home'));



/*app.post('/api/user', (req, res) =>{
    const user = req.body;

    if(!user.firstname){
        return res.status(400).send({status: "error", error: "Valores incompletos"});
    }
    users.push(user);
    res.send({status: "Success", message: "Usuario creado"})

})*/

/*app.put('/api/user', (req, res) =>{
    const user = req.body;
    if(!user.firstname){
        return res.status(400).send({status: "error", error: "Valores incompletos"});
    }
    const idx = users.findIndex(u => u.firstname == user.firstname);
    if (idx < 0){
        return res.status(400).send({status: "error", error: "User not found"});
    } else {
        users[idx] = user;
        res.send({status: "Success", message: "user updated"}) 
    }
})*/

/*app.delete('/api/user/:name', (req, res) =>{
    const name = req.params.name;
    const actualtotal = users.length;
    users = users.filter(u => u.firstname != name);

    if ( users.length == actualtotal){
        return res.status(400).send({status: "error", error: "User not found"});
    } else{
        res.send({status: "Success", message: "user deleted"}) 
    }
})*/


app.listen(8080, () => {
    console.log('escuchando el 8080 pa');
})

