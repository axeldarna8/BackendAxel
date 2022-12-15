const express = require('express');
const fs = require('fs');
const app = express();
const productos = require('../productos.json');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const users = [];

app.post('/api/user', (req, res) =>{
    const user = req.body;

    if(!user){
        return res.status(400).send({status: "error", error: "Valores incompletos"});
    }
    users.push(user);
    res.send({status: "Success", message: "Usuario creado"})

})

app.get('/products', (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        const productsFiltered = productos.filter(u => u.id <= limit)
        res.send(productsFiltered)
    } else {
        res.send({ productos });
    }

})

app.get('/products/:pid', (req, res) => {
    const pid = req.params.pid;
    const objeto = productos.find(u => u.id.toString() === pid);
    if (!objeto) {
        return res.send({ error: "Objeto no encontrado" });
    } else {
        res.send({ objeto });
    }
})



app.listen(8080, () => {
    console.log('escuchando el 8080 pa');
})

